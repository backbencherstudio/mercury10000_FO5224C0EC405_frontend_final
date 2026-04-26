'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'nookies';
import Image from 'next/image'
import logo from '@/public/images/auth/auth-logo-2.png'
import authImg from '@/public/images/auth/sign-up-img.png'
import Link from 'next/link'
import GoogleIcon from '@/components/icons/auth/GoogleIcon'
import AppleIcon from '@/components/icons/auth/AppleIcon'
import { toast } from 'react-hot-toast';
import { Fetch } from '@/lib/Fetch';
import { getDashboardPathByRole, normalizeAppRole } from '@/helper/auth.helper';

type LoginResponse = {
  success?: boolean;
  message?: string;
  authorization?: {
    type?: string;
    access_token?: string;
    refresh_token?: string;
  };
  userid?: string;
  type?: string;
  email?: string;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const getCookieMaxAge = () => (remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60);
  const getErrorMessage = (value: unknown) => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      const errorValue = value as { message?: unknown; error?: unknown; statusCode?: unknown };
      if (typeof errorValue.message === 'string') return errorValue.message;
      if (typeof errorValue.error === 'string') return errorValue.error;
      if (typeof errorValue.statusCode === 'number') return 'Request failed';
    }
    return 'Unable to log in';
  };

  const getErrorField = (value: unknown, message: string): 'email' | 'password' => {
    const messageText = message.toLowerCase();

    if (messageText.includes('email') && !messageText.includes('password')) {
      return 'email';
    }

    if (messageText.includes('password')) {
      return 'password';
    }

    if (value && typeof value === 'object') {
      const errorValue = value as { field?: unknown; path?: unknown };
      const field = String(errorValue.field || errorValue.path || '').toLowerCase();
      if (field.includes('email')) return 'email';
      if (field.includes('password')) return 'password';
    }

    return 'password';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextFieldErrors: { email?: string; password?: string } = {};

    if (!email.trim()) nextFieldErrors.email = 'Email is required';
    if (!password.trim()) nextFieldErrors.password = 'Password is required';

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setLoading(true);
    setFieldErrors({});

    try {
      const response = await Fetch.post('/auth/login', { email, password });
      const data: LoginResponse = response?.data ?? response;

      if (!data?.success || !data.authorization?.access_token) {
        throw new Error(data?.message || 'Login failed');
      }

      const appRole = normalizeAppRole(data.type) ?? 'admin';
      const maxAge = getCookieMaxAge();
      const secure = process.env.NODE_ENV === 'production';

      setCookie(null, 'user', JSON.stringify({
        email: email,
        userid: data.userid,
        role: appRole,
        type: data.type,
      }), {
        maxAge,
        path: '/',
        secure,
        sameSite: 'strict'
      });
      setCookie(null, 'userRole', appRole, {
        maxAge,
        path: '/',
        secure,
        sameSite: 'strict'
      });
      setCookie(null, 'userType', data.type || '', {
        maxAge,
        path: '/',
        secure,
        sameSite: 'strict'
      });
      setCookie(null, 'accessToken', data.authorization.access_token, {
        maxAge,
        path: '/',
        secure,
        sameSite: 'strict'
      });
      setCookie(null, 'refreshToken', data.authorization.refresh_token || '', {
        maxAge,
        path: '/',
        secure,
        sameSite: 'strict'
      });

      toast.success(data.message || 'Logged in successfully');

      const redirectPath = searchParams?.get('redirect');
      const destination = redirectPath?.startsWith('/')
        ? redirectPath
        : getDashboardPathByRole(appRole);
      router.replace(destination);
    } catch (loginError: any) {
      const errorSource = loginError?.response?.data?.message || loginError?.response?.data || loginError?.message;
      const message = getErrorMessage(errorSource);
      const field = getErrorField(errorSource, message);
      const nextFieldErrors: { email?: string; password?: string } = {};
      nextFieldErrors[field] = message;
      setFieldErrors(nextFieldErrors);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' flex   lg:flex-row flex-col  items-center justify-center '>
      <div className=' w-full lg:flex-1 bg-[#e7f9fb] p-5  lg:h-screen'>
        <div className=' inline-flex flex-col items-center justify-center gap-3'>
          <Image src={logo} alt='logo' />
          <h2 className=' text-black text-[32px] font-semibold '>Agua Leads</h2>
        </div>
        <div className='  lg:mt-36 flex justify-center'>
          <Image src={authImg} alt=' auth img' className=' ' />
        </div>
      </div>
      <div className=' flex-1 flex items-center justify-center'>
        <div className=' border p-12 rounded-[12px] '>
          <h2 className=' text-center text-[161721] text-[26px] font-medium '>Login</h2>
          <p className=' text-center text-[#777980] text-base mt-2'> Enter your email and password</p>
          {/* {pathname === '/log-in' && (
            <p className=' text-center text-sm text-[#0e93a1] mt-2'>Use your account from the API endpoint.</p>
          )} */}
          <form className=' mt-12 space-y-5 lg:w-[458px] ' onSubmit={handleLogin}>
            <div className=' flex flex-col  w-full gap-2'>
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                className='    border border-[#c5c5c5] rounded-[8px] p-3  '
                placeholder='Enter your Email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors(prev => ({ ...prev, email: undefined }));
                  }
                }}
              />
              {fieldErrors.email && <span className="text-red-600 text-sm">{fieldErrors.email}</span>}
            </div>
            <div className=' flex flex-col  w-full gap-2'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className='    border border-[#c5c5c5] rounded-[8px] p-3'
                placeholder='Enter your password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors(prev => ({ ...prev, password: undefined }));
                  }
                }}
              />
              {fieldErrors.password && <span className="text-red-600 text-sm">{fieldErrors.password}</span>}
            </div>
            <div className=' flex justify-between items-center'>
              <div className='  flex items-center gap-2.5'>
                <input type="checkbox" id="remember" className=' accent-[#0e93a1] h-3 w-3 rounded-[2px] cursor-pointer' checked={remember} onChange={e => setRemember(e.target.checked)} />
                <label htmlFor="remember">keep me logged in</label>
              </div>
              <Link href='#' className=' text-[#07454b]  text-base'> Forgot password </Link>
            </div>
            <button type="submit" disabled={loading} className=' py-3  bg-[#0e93a1] rounded-[8px] w-full block   text-white mt-5 cursor-pointer hover:bg-[#0e93a1]/90 transition ease-in-out duration-200   text-center disabled:opacity-70 disabled:cursor-not-allowed'>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
          <div className={`flex items-center justify-center w-full my-5`}>
            <div className="flex-1 h-[1px] bg-[#e9e9ea]"></div>
            <span className="px-2.5 text-sm lg:text-base text-[#777980]">Or</span>
            <div className="flex-1 h-[1px] bg-[#e9e9ea]"></div>
          </div>
          <div className=' flex flex-col lg:flex-row items-center  gap-5'>
            <button className=' flex items-center gap-2.5 py-4 px-6 bg-[#5583ec] rounded-[8px] text-white cursor-pointer'> <GoogleIcon className=' bg-white rounded-full ' /> Login with Google </button>
            <button className=' flex items-center gap-2.5 py-4 px-6 border border-[#e9e9ea] cursor-pointer    rounded-[8px] text-[#1D1F2C]'>  <AppleIcon /> Login with Apple </button>
          </div>
        </div>
      </div>
    </div>
  )
}
