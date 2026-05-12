'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import SearchIcon from '@/components/icons/admin/SearchIcon'

import confirmImg from '@/public/images/admin/confirm-img.png'
import bigStar from '@/public/images/admin/big-star.png'
import smallStar from '@/public/images/admin/little-star.png'

import {
    useUpdataNoteMutation,
    useSingleSupportQuery
} from '@/redux/features/Support/support'

import { useSearchParams } from 'next/navigation'

export default function WriteNoteHome() {

    const [open, setOpen] = useState(false)
    const [note, setNote] = useState("")

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const { data, isLoading } = useSingleSupportQuery(id!, {
        skip: !id
    })

    const [updataNote] = useUpdataNoteMutation()

    const currentNote = data?.data

    useEffect(() => {
        if (currentNote?.secretary_note) {
            setNote(currentNote.secretary_note)
        }
    }, [currentNote])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!id || !note.trim()) return

        try {
            await updataNote({
                id,
                secretaryNote: note.trim()
            }).unwrap()

            setOpen(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>

            {/* HEADER */}
            <div className='p-2.5 border-b border-[#11BECF] inline-block'>
                <h2 className='text-lg text-[#0E93A1] font-medium'>
                    Write Note
                </h2>
            </div>

            <div className='border border-[#D2D2D5] rounded-[8px] p-3 sm:p-6 mt-2.5 flex flex-col lg:flex-row gap-6'>

                {/* LEFT SECTION */}
                <div className='flex-1 p-3 sm:p-6 border border-[#E9E9EA] rounded-[12px]'>

                    <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>
                        User Details
                    </h3>

                    <div className='mt-6 space-y-6'>

                        {/* NAME */}
                        <div className='border-b border-[#E9E9EA] p-2 opacity-70'>
                            <h4 className='text-base sm:text-lg font-semibold mb-1.5'>
                                User Name
                            </h4>
                            <p className='text-sm sm:text-base text-[#777980]'>
                                {currentNote?.user?.name || 'N/A'}
                            </p>
                        </div>

                        {/* PHONE */}
                        <div className='border-b border-[#E9E9EA] p-2 opacity-70'>
                            <h4 className='text-base sm:text-lg font-semibold mb-1.5'>
                                Phone No.
                            </h4>
                            <p className='text-sm sm:text-base text-[#777980]'>
                                {currentNote?.user?.phone_number || 'N/A'}
                            </p>
                        </div>

                        {/* CITY */}
                        <div className='border-b border-[#E9E9EA] p-2 opacity-70'>
                            <h4 className='text-base sm:text-lg font-semibold mb-1.5'>
                                City
                            </h4>
                            <p className='text-sm sm:text-base text-[#777980]'>
                                {currentNote?.user?.city || 'N/A'}
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className='flex-1 p-3 sm:p-6 border border-[#E9E9EA] rounded-[12px] h-fit'>

                    <h3 className='text-xl sm:text-2xl font-medium'>
                        Write a Note Summary To Admin
                    </h3>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-1.5 mt-6'>

                        <label htmlFor="note">Note</label>

                        <textarea
                            id="note"
                            rows={4}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className='border border-[#E9E9EA] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#0b7680]'
                            placeholder='Write your note here...'
                        />

                        <button
                            type="submit"
                            disabled={!note.trim()}
                            className={`py-4 w-full text-white rounded-[8px] mt-6
                                ${!note.trim() ? 'bg-gray-400' : 'bg-[#0b7680]'}`}
                        >
                            Send
                        </button>

                    </form>

                </div>

            </div>

            {/* SUCCESS MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-6 sm:p-16">

                    <div className="flex justify-center items-center">
                        <div className="relative">
                            <Image src={confirmImg} alt="confirm" />
                            <Image src={bigStar} className="absolute top-10 left-0" alt="" />
                            <Image src={bigStar} className="absolute top-28 right-0" alt="" />
                            <Image src={smallStar} className="absolute top-28 left-5" alt="" />
                            <Image src={smallStar} className="absolute top-8 right-5" alt="" />
                        </div>
                    </div>

                    <h2 className='text-center text-xl sm:text-2xl font-medium mt-8'>
                        Summary Sent Successfully To Admin
                    </h2>

                </DialogContent>
            </Dialog>

        </div>
    )
}