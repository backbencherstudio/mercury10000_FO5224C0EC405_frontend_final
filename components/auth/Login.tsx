'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { UserRole } from '@/config/menuItems';
import Image from 'next/image'
import logo from '@/public/images/auth/auth-logo-2.png'
import authImg from '@/public/images/auth/sign-up-img.png'
import Link from 'next/link'
import GoogleIcon from '@/components/icons/auth/GoogleIcon'
import AppleIcon from '@/components/icons/auth/AppleIcon'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Demo credentials for admin and secretary only
  const demoUsers: { email: string; password: string; role: UserRole }[] = [
    { email: 'admin@school.com', password: 'admin123', role: 'admin' },
    { email: 'secretary@school.com', password: 'secretary123', role: 'secretary' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoUsers.find(u => u.email === email && u.password === password);
    if (user) {
      // Store user data in cookies using nookies
      setCookie(null, 'user', JSON.stringify({
        email: user.email,
        role: user.role,
      }), {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      setCookie(null, 'userRole', user.role, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      setError('');
      if (user.role === 'secretary') {
        router.push('/secretary-dashboard');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError('Invalid credentials. Try admin@school.com/admin123 or secretary@school.com/secretary123');
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
          <form className=' mt-12 space-y-5 lg:w-[458px] ' onSubmit={handleLogin}>
            <div className=' flex flex-col  w-full gap-2'>
              <label htmlFor="email">Email Address</label>
              <input type="text" id="email" className='    border border-[#c5c5c5] rounded-[8px] p-3  ' placeholder='Enter your Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className=' flex flex-col  w-full gap-2'>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className='    border border-[#c5c5c5] rounded-[8px] p-3' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className=' flex justify-between items-center'>
              <div className='  flex items-center gap-2.5'>
                <input type="checkbox" id="remember" className=' accent-[#0e93a1] h-3 w-3 rounded-[2px] cursor-pointer' checked={remember} onChange={e => setRemember(e.target.checked)} />
                <label htmlFor="remember">keep me logged in</label>
              </div>
              <Link href='#' className=' text-[#07454b]  text-base'> Forgot password </Link>
            </div>
            <button type="submit" className=' py-3  bg-[#0e93a1] rounded-[8px] w-full block   text-white mt-5 cursor-pointer hover:bg-[#0e93a1]/90 transition ease-in-out duration-200   text-center'>Login</button>
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
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
