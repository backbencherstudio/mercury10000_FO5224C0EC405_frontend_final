import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/auth/auth-logo-2.png'
import authImg from '@/public/images/auth/sign-up-img.png'
import Link from 'next/link'
import GoogleIcon from '@/public/icons/auth/GoogleIcon'
import AppleIcon from '@/public/icons/auth/AppleIcon'

export default function SignUp() {
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
          <h2 className=' text-center text-[161721] text-[26px] font-medium '>Sign up</h2>
          <p className=' text-center text-[#777980] text-base mt-2'> Enter your email and password</p>
          <form action="" className=' mt-12 space-y-5 lg:w-[458px] '>
            <div className=' flex flex-col  w-full gap-2'>
              <label htmlFor="email">Email Address</label>
              <input type="text" name="" id="email" className='    border border-[#c5c5c5] rounded-[8px] p-3  ' placeholder='Enter your Email' />

            </div>
            <div className=' flex flex-col  w-full gap-2'>
              <label htmlFor="password">Password</label>
              <input type="password" name="" id="password" className='    border border-[#c5c5c5] rounded-[8px] p-3' placeholder='Enter your password' />

            </div>
            <div className=' flex justify-between items-center'>
              <div className='  flex items-center gap-2.5'>
                <input type="checkbox" name="" id="remember" className=' accent-[#0e93a1] h-3 w-3 rounded-[2px] cursor-pointer' />
                <label htmlFor="remember">keep me logged in</label>

              </div>
              <Link href='#' className=' text-[#07454b]  text-base'> Forgot password </Link>
            </div>
            <button className=' py-3  bg-[#0e93a1] rounded-[8px] w-full block   text-white mt-5 cursor-pointer hover:bg-[#0e93a1]/90 transition ease-in-out duration-200   text-center'>Sign Up</button>
          </form>

          <div className={`flex items-center justify-center w-full my-5`}>
            <div className="flex-1 h-[1px] bg-[#e9e9ea]"></div>
            <span className="px-2.5 text-sm lg:text-base text-[#777980]">Or</span>
            <div className="flex-1 h-[1px] bg-[#e9e9ea]"></div>
          </div>

          <div className=' flex flex-col lg:flex-row items-center  gap-5'>
            <button className=' flex items-center gap-2.5 py-4 px-6 bg-[#5583ec] rounded-[8px] text-white cursor-pointer'> <GoogleIcon className=' bg-white rounded-full ' /> Signup with Google </button>
            <button className=' flex items-center gap-2.5 py-4 px-6 border border-[#e9e9ea] cursor-pointer    rounded-[8px] text-[#1D1F2C]'>  <AppleIcon /> Signup with Google </button>

          </div>

        </div>

      </div>

    </div>
  )
}
