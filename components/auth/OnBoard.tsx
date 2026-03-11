import React from 'react'
import Image from 'next/image'
import onBoardImg from '@/public/images/auth/onboardLogo.png'
 
import Link from 'next/link'
import RightIcon from '@/public/icons/auth/RightIcon'

export default function OnBoard() {
  return (
    <div className=' flex items-center justify-center bg-[#11becf] bg-cover h-screen'>
        <div>
            <div className=' flex flex-col items-center justify-center'>
             <Image src={onBoardImg} alt='onboard img'/>
             <h2 className=' text-white text-2xl lg:text-[32px] font-semibold mt-5'>Agua Leads</h2>
             <p className=' text-white text-base font-medium mt-2 text-center'>Licensed Contractor Network</p>
            </div>

            <h1 className=' text-white text-3xl md:text-5xl lg:text-[64px] font-semibold text-center py-12 leading-[120%]'>Welcome To Aqua <br /> Leads</h1>
            <div className=' flex items-center justify-center'>
            <Link href='/region' className=' bg-white py-4 flex items-center justify-center w-full gap-2.5 max-w-[458px] rounded-[8px] cursor-pointer hover:bg-white/90 transition-colors ease-in duration-300 mx-6 lg:mx-0'> Get Starte <RightIcon/> </Link>

            </div>

        </div>
        
    </div>
  )
}
