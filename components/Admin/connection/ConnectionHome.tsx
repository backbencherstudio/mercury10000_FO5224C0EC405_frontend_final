'use client';
import ImageIcon from '@/components/icons/admin/ImageIcon';

import { usePostConnectionRequestMutation } from '@/redux/features/connection/connections';
import { useGetTradesQuery } from '@/redux/features/user/user';
import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function ConnectionHome() {
    const { data: tradesData, isLoading: isLoadingTrades } =
        useGetTradesQuery(undefined);

    // API data array
    const trades = Array.isArray(tradesData) ? tradesData : tradesData?.data || [];

    const [postconnections, { isLoading }] =
        usePostConnectionRequestMutation();

    const [formData, setFormData] = useState({
        trade: '', // ekhane trade id thakbe
        location: '',
        city: '',
        description: '',
    });

    const [images, setImages] = useState<(File | null)[]>([
        null,
        null,
        null
    ]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (idx: number, file: File | null) => {
        setImages(prev => {
            const updated = [...prev];
            updated[idx] = file;
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = new FormData();

        // trade id jabe
        payload.append('trade_id', formData.trade);

        payload.append('location', formData.location);

        if (formData.city) {
            payload.append('city', formData.city);
        }

        if (formData.description) {
            payload.append('description', formData.description);
        }

        images.forEach((file) => {
            if (file) {
                payload.append('files', file);
            }
        });

        postconnections({ data: payload });
    };

    return (
        <div className='border border-[#D2D2D5] p-4 sm:p-6 rounded-[8px] mt-[30px] w-full'>
            <h2 className='text-2xl text-[#111827] font-medium'>Upload a Request</h2>

            <form onSubmit={handleSubmit} className='mt-12 space-y-6'>
                <div>
                    <label
                        htmlFor="trade"
                        className='text-base text-[#161721]'
                    >
                        Trade <span className='text-red-500'>*</span>
                    </label>

                    <Select

                        value={formData.trade}
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                trade: value
                            })
                        }
                    >
                        <SelectTrigger className="w-full mt-1.5 h-[48px] py-5 border border-[#D2D2D5]  rounded-[8px]">
                            <SelectValue placeholder="Select Trade" />
                        </SelectTrigger>

                        <SelectContent className=''>
                            {trades?.map((trade: any) => (
                                <SelectItem
                                    key={trade.id}
                                    value={trade.id}
                                >
                                    {trade.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* <div>
                    <label htmlFor="trade_id" className='text-base text-[#161721]'>Trade ID: <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="trade_id"
                        id="trade_id"
                        value={formData.trade_id}
                        onChange={handleInputChange}
                        className='w-full p-2 border border-[#D2D2D5] rounded-[8px] mt-1.5'
                        placeholder='e.g. cmo8gpe1p0000m4tztacc664d'
                        required
                    />
                </div> */}

                <div>
                    <label htmlFor="location" className='text-base text-[#161721]'>Location: <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className='w-full p-2 border border-[#D2D2D5] rounded-[8px] mt-1.5'
                        // placeholder='Miami, FL'
                        required
                    />
                </div>

                <div>
                    <label htmlFor="city" className='text-base text-[#161721]'>City:</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className='w-full p-2 border border-[#D2D2D5] rounded-[8px] mt-1.5'
                    // placeholder='Miami'
                    />
                </div>

                <div>
                    <label htmlFor="note" className='text-base text-[#161721]'>Write Note:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className='w-full border border-[#E9E9EA] p-4 rounded-[12px] bg-[#F6F8FA] mt-2 h-[120px]'
                        placeholder='Write the detailed issue here related to connection.....'
                    />
                </div>

                <div>
                    <label className='text-base text-[#070707]'>Upload Photos Here</label>
                    <div className='flex flex-col sm:flex-row items-stretch gap-2 mt-2'>
                        {[0, 1, 2].map(idx => (
                            <label
                                key={idx}
                                className='py-9 border border-dashed flex-1 rounded-[8px] flex flex-col items-center justify-center cursor-pointer relative group min-h-[120px]'
                            >
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
                                        const file = e.target.files?.[0] ?? null;
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
                        disabled={isLoading}
                        className="w-[248px] bg-[#118387] hover:bg-[#0e6c6f] disabled:opacity-60 text-white text-base rounded-md py-2 transition-colors cursor-pointer"
                    >
                        {isLoading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </form>
        </div>
    );
}
