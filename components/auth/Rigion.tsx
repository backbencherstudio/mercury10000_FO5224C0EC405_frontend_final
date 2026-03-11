import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/auth/auth-logo-2.png'
import authImg from '@/public/images/auth/sign-up-img.png'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'

export default function Rigion() {
  return (
     <div className=' flex   lg:flex-row flex-col  items-center justify-center '>
            <div className=' w-full lg:flex-1 bg-[#e7f9fb]   p-5  lg:h-screen'>
                <div className=' inline-flex flex-col items-center justify-center gap-3'>
                    <Image src={logo} alt='logo' />
                    <h2 className=' text-black text-[32px] font-semibold '>Agua Leads</h2>
                </div>
                <div className='  lg:mt-36 flex justify-center'>
                    <Image src={authImg} alt=' auth img' className=' ' />

                </div>
            </div>
            <div className=' flex-1 flex items-center justify-center'>
                <div>
                    <div className=' border p-12 rounded-[12px] '>
                        <h2 className=' text-center text-[161721] text-[26px] font-medium '>Select Your Location</h2>
                        <p className=' text-center text-[#777980] text-base mt-2'> Select your region/country for easy verification</p>
                        <div className=' mt-12'>
                            <label htmlFor="location" className=' text-base text-[#161721] '>Select a location</label>
                            <Select >
                                <SelectTrigger className="w-full   py-5 mt-1.5 cursor-pointer ">
                                    <SelectValue placeholder="United Kingdom"  className=' text-black' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="brazil" className='data-[state=checked]:bg-[#0e93a1]   data-[state=checked]:text-white text-black'>Brazil</SelectItem>
                                        <SelectItem value="bangladesh" className=' data-[state=checked]:bg-[#0e93a1]   data-[state=checked]:text-white text-black'>Bangladesh</SelectItem>
                                        <SelectItem value="india" className=' data-[state=checked]:bg-[#0e93a1]   data-[state=checked]:text-white text-black'>India</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                             <Link href='/sign-up'   className=' py-3  bg-[#0e93a1] rounded-[8px] w-full block   text-white mt-5 cursor-pointer hover:bg-[#0e93a1]/90 transition ease-in-out duration-200   text-center'>Next</Link>
                                
                        </div>

                    </div>
                </div>
            </div>

        </div>
  )
}
