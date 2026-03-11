import CrossIcon from '@/public/icons/admin/CrossIcon'
import Mp4Icon from '@/public/icons/admin/Mp4Icon'
import UploadFileIcon from '@/public/icons/admin/UploadFileIcon'
import React from 'react'

export default function OnBoard() {
  return (
    <div className=' mt-6'>
        <div className=' flex items-center gap-6'>
            <div className=' flex-1'>
                <h3 className=' text-[26px] text-[#161721] font-medium'>Tutorial Video</h3>
                <p className='text-base text-[#161721] mt-6'>Upload a video you want to view the users as tutorial </p>
                <div className=' space-y-6'>

                <div className=' border border-[#D2D2D5] border-dashed px-4 py-20 rounded-[8px] mt-2 '>
                                 <div className=' flex flex-col items-center justify-center'>
                                    <UploadFileIcon/>
                                    <div className=' my-4 '>
                                    <p className=' text-center  '>Drag and drop files here</p>
                                    <p className=' text-center  mt-2'>OR</p>
                                    </div>
                                    <button className=' py-4 px-6 rounded-[8px] bg-[#0b7680] text-white text-base cursor-pointer '>Browse File</button>

                                 </div>
                </div>
                <div className=' flex flex-col'>
                    <label htmlFor="duration" className=' text-base text-[#161721] '>Set Unskippable Duration</label>
                    <input type="text" name="" id="duration" className=' border py-3 px-2.5  rounded-[8px] mt-1.5' value='30 sec' />
                </div>
                <div className=' flex items-center justify-between bg-[#e9e9ea] p-3 rounded-[12px]'>
                    <div className=' flex items-center gap-2.5'>
                    <Mp4Icon/>
                    <div>
                        <h4>Tutorial video</h4>
                        <p>150 MB</p>
                    </div>

                    </div>
                    <button className=' cursor-pointer'>
                <CrossIcon/>

                    </button>
                </div>
                <button className=' text-base text-white bg-[#0b7680] w-full rounded-[8px] py-4 cursor-pointer '>Save Change</button>
                </div>
            </div>
            <div className=' flex-1'>
                <h3 className=' text-[26px] text-[#161721] font-medium'>Meeting Video</h3>
                <p className='text-base text-[#161721] mt-6'>Upload a video you want to view the users regarding meeting </p>
                <div className=' space-y-6'>

                <div className=' border border-[#D2D2D5] border-dashed px-4 py-20 rounded-[8px] mt-2 '>
                                 <div className=' flex flex-col items-center justify-center'>
                                    <UploadFileIcon/>
                                    <div className=' my-4 '>
                                    <p className=' text-center  '>Drag and drop files here</p>
                                    <p className=' text-center  mt-2'>OR</p>
                                    </div>
                                    <button className=' py-4 px-6 rounded-[8px] bg-[#0b7680] text-white text-base cursor-pointer '>Browse File</button>

                                 </div>
                </div>
                <div className=' flex flex-col'>
                    <label htmlFor="duration" className=' text-base text-[#161721] '>Set Unskippable Duration</label>
                    <input type="text" name="" id="duration" className=' border py-3 px-2.5  rounded-[8px] mt-1.5' value='30 sec' />
                </div>
                <div className=' flex items-center justify-between bg-[#e9e9ea] p-3 rounded-[12px]'>
                    <div className=' flex items-center gap-2.5'>
                    <Mp4Icon/>
                    <div>
                        <h4>Tutorial video</h4>
                        <p>150 MB</p>
                    </div>

                    </div>
                    <button className=' cursor-pointer'>
                <CrossIcon/>

                    </button>
                </div>
                <button className=' text-base text-white bg-[#0b7680] w-full rounded-[8px] py-4 cursor-pointer '>Save Change</button>
                </div>
            </div>
            
             
        </div>
    </div>
  )
}
