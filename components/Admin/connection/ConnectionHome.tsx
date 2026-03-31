'use client';
import ImageIcon from '@/components/icons/admin/ImageIcon';
import React, { useState } from 'react';

export default function ConnectionHome() {
    const [images, setImages] = useState<(File | null)[]>([null, null, null]);

    const handleImageChange = (idx: number, file: File | null) => {
        setImages(prev => {
            const updated = [...prev];
            updated[idx] = file;
            return updated;
        });
    };

    return (
        <div className='border border-[#D2D2D5] p-4 sm:p-6 rounded-[8px] mt-[30px] w-full'>
            <h2 className=' text-2xl text-[#111827] font-medium'>Upload a Request</h2>

            <form action="" className=' mt-12 space-y-6'>
                <div>
                    <label htmlFor="city" className=' text-base text-[#161721]'>City:</label>
                    <input type="text" name="city" id="city" className=' w-full p-2 border border-[#D2D2D5] rounded-[8px] mt-1.5' placeholder='New York' />
                </div>
                <div>
                    <label htmlFor="trade" className=' text-base text-[#161721]'>Trade:</label>
                    <input type="text" name="trade" id="trade" className=' w-full p-2 border border-[#D2D2D5] rounded-[8px] mt-1.5' placeholder='New York' />
                </div>
                <div >
                    <label htmlFor="note" className=' text-base text-[#161721]'>Write Note:</label>
                    <textarea name="" id="note" className=' w-full border border-[#E9E9EA] p-4 rounded-[12px]  bg-[#F6F8FA] mt-2 h-[120px]' placeholder='Write the detailed issue here related to connection.....'></textarea>
                </div>
                <div>
                    <label className=' text-base text-[#070707]'>Upload Photos Here</label>
                    <div className='flex flex-col sm:flex-row items-stretch gap-2 mt-2'>
                        {[0, 1, 2].map(idx => (
                            <label key={idx} className='py-9 border border-dashed flex-1 rounded-[8px] flex flex-col items-center justify-center cursor-pointer relative group min-h-[120px]'>
                                {images[idx] ? (
                                    <img
                                        src={URL.createObjectURL(images[idx] as File)}
                                        alt={`Preview ${idx + 1}`}
                                        className='object-cover w-full h-full rounded-[8px] absolute inset-0 z-10'
                                    />
                                ) : (
                                    <div className='flex flex-col items-center z-20'>
                                        <div className='p-2 bg-[#d2d2d5] rounded-full inline-block'>
                                            <ImageIcon />
                                        </div>
                                        <p>Click to upload</p>
                                    </div>
                                )}
                                <input
                                    type='file'
                                    accept='image/*'
                                    className='absolute inset-0 opacity-0 cursor-pointer z-30'
                                    onChange={e => {
                                        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                                        handleImageChange(idx, file);
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>

               
                <div className="flex justify-center pt-2">
                    <button
                        type="submit"
                        className="w-[248px] bg-[#118387] hover:bg-[#0e6c6f] text-white text-base rounded-md py-2 transition-colors cursor-pointer"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}
 