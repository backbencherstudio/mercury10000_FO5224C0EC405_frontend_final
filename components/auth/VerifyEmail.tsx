'use client'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/auth/auth-logo-2.png'
import authImg from '@/public/images/auth/sign-up-img.png'
import Link from 'next/link'
import GoogleIcon from '@/components/icons/auth/GoogleIcon'
import AppleIcon from '@/components/icons/auth/AppleIcon'
import OTPInput from './OtpInput'
import { useRouter } from 'next/navigation'

export default function VerifyEmail() {

    const router = useRouter()


const handleOtpSend=()=>{
    router.push('/verify-success')

}

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
                
                    <div className=' border p-12 rounded-[12px] max-w-[554px] w-full'>
                        <h2 className=' text-center text-[161721] text-[26px] font-medium '>Verify your email address</h2>
                        <p className=' text-center text-[#777980] text-base mt-2'> Enter the six digit verification code sent to </p>
                        <p className=' text-base text-black  text-center'> www.samplemail@gmail.com</p>
                     <div className=' mt-12'>
                     <OTPInput/>

                       <button className=' py-3  bg-[#0e93a1] rounded-[8px] w-full block   text-white my-5 cursor-pointer hover:bg-[#0e93a1]/90 transition ease-in-out duration-200   text-center' onClick={handleOtpSend}> Submit</button>

                       <p className=' text-base text-[#1d1f2c] text-center'>Didn’t received a code ? <Link href='#' className=' text-[#07454b]'>Resend</Link> </p>

                     </div>

                    </div>
               
            </div>

        </div>
  )
}
