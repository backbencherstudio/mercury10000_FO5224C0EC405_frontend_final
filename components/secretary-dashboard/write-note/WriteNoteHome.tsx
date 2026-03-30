'use client'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import Image from 'next/image'

import confirmImg from '@/public/images/admin/confirm-img.png' 
import bigStar from '@/public/images/admin/big-star.png'
import smallStar from '@/public/images/admin/little-star.png'

export default function WriteNoteHome() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <div className=' p-2.5 border-b border-[#11BECF] inline-block'>
                <h2 className=' text-lg text-[#0E93A1] font-medium'>Write Note</h2>
            </div>
            <div className=' border border-[#D2D2D5] rounded-[8px] p-6 mt-2.5 flex  gap-6'>
                <div className=' flex-1 p-6 border border-[#E9E9EA] rounded-[12px]'>
                    <h3 className=' text-2xl text-[#111827] font-medium'>Search Select User Here</h3>
                    <div className=' relative my-6'>
                        <SearchIcon className=' absolute top-1/2 -translate-y-1/2 left-4 ' />
                        <input type="text" name="" id="" className=' bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-full' placeholder='Search user here' />
                    </div>
                    <div className='  p-6 border border-[#E9E9EA] rounded-[8px]'>
                         <h3 className=' text-2xl text-[#111827] font-medium'>Basic Details</h3>
                         <div className=' mt-6 space-y-6'>
                            <div className=' border-b border-[#E9E9EA] p-2'>
                                <h4 className=' text-lg text-[#1D1F2C] font-semibold mb-1.5'>User Name</h4>
                                <p className=' text-base text-[#777980] '>Marvin Brandy</p>
                            </div>
                            <div className=' border-b border-[#E9E9EA] p-2'>
                                <h4 className=' text-lg text-[#1D1F2C] font-semibold mb-1.5'>User ID</h4>
                                <p className=' text-base text-[#777980] '>1237</p>
                            </div>
                            <div className=' border-b border-[#E9E9EA] p-2'>
                                <h4 className=' text-lg text-[#1D1F2C] font-semibold mb-1.5'>Phone No.</h4>
                                <p className=' text-base text-[#777980] '>+32 2132343</p>
                            </div>
                            <div className=' border-b border-[#E9E9EA] p-2'>
                                <h4 className=' text-lg text-[#1D1F2C] font-semibold mb-1.5'>City</h4>
                                <p className=' text-base text-[#777980] '>Spain</p>
                            </div>
                            <div className='  p-2'>
                                <h4 className=' text-lg text-[#1D1F2C] font-semibold mb-1.5'>Work at Company</h4>
                                <p className=' text-base text-[#777980] '>LMS</p>
                            </div>
                         </div>
                         <button className=' py-4 w-full text-white text-base bg-[#0b7680] rounded-[8px] mt-6 cursor-pointer'>Select User</button>
                    </div>
                </div>
                <div className=' flex-1 p-6 border border-[#E9E9EA] rounded-[12px] h-fit'>
                    <h3 className=' text-2xl text-[#111827] font-medium'>Write a Note Summery To Admin</h3>
                    <div className=' flex flex-col gap-1.5 mt-6'>
                        <label htmlFor="note">Note</label>
                        <textarea id="note" rows={4} className=' border border-[#E9E9EA] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#0b7680]' placeholder='Write your note here...'></textarea>
                    </div>
                    <button 
                        className=' py-4 w-full text-white text-base bg-[#0b7680] rounded-[8px] mt-6 cursor-pointer'
                        onClick={() => setOpen(true)}
                    >Send</button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="p-16">
                            <div className="flex justify-center items-center">
                                <div className="relative">
                                    <Image src={confirmImg} alt="confirm img" />
                                    <Image src={bigStar} alt="big star" className="absolute top-10 left-0" />
                                    <Image src={bigStar} alt="big star" className="absolute top-28 right-0" />
                                    <Image src={smallStar} alt="little star" className="absolute top-28 left-5" />
                                    <Image src={smallStar} alt="little star" className="absolute top-8 right-5" />
                                </div>
                            </div>
                            <h2 className='text-center text-2xl font-medium mt-8'>Summery Sent Successfully To Admin</h2>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </div>
    )
}
