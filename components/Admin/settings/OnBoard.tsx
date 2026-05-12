"use client"
import UploadFileIcon from '@/components/icons/admin/UploadFileIcon'
import { usePostOnboardingMutation } from '@/redux/features/settings/settings'
import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'

export default function OnBoard() {
    const [postOnboarding] = usePostOnboardingMutation()

    // States for files
    const [tutorialVideoFile, setTutorialVideoFile] = useState<File | null>(null)
    const [meetingVideoFile, setMeetingVideoFile] = useState<File | null>(null)

    // Video Preview URLs
    const tutorialPreviewUrl = useMemo(() => {
        return tutorialVideoFile
            ? URL.createObjectURL(tutorialVideoFile)
            : null
    }, [tutorialVideoFile])

    const meetingPreviewUrl = useMemo(() => {
        if (!meetingVideoFile) return null

        const url = URL.createObjectURL(meetingVideoFile)
        return url
    }, [meetingVideoFile])

    React.useEffect(() => {
        return () => {
            if (tutorialPreviewUrl) URL.revokeObjectURL(tutorialPreviewUrl)
            if (meetingPreviewUrl) URL.revokeObjectURL(meetingPreviewUrl)
        }
    }, [tutorialPreviewUrl, meetingPreviewUrl])

    // States for duration
    const [tutorialUnskippableDuration, setTutorialUnskippableDuration] = useState("30")
    const [meetingUnskippableDuration, setMeetingUnskippableDuration] = useState("30")

    const handlePostOnboarding = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const payload = new FormData()

            if (meetingVideoFile) {
                payload.append("meeting_video_file", meetingVideoFile)
            }

            if (tutorialVideoFile) {
                payload.append("tutorial_video_file", tutorialVideoFile)
            }

            payload.append("meeting_unskippable_duration", meetingUnskippableDuration)
            payload.append("tutorial_unskippable_duration", tutorialUnskippableDuration)

            const result = await postOnboarding({ data: payload }).unwrap()

            toast.success("Saved successfully!")

            // RESET FILES (IMPORTANT)
            setTutorialVideoFile(null)
            setMeetingVideoFile(null)

        } catch (error) {
            toast.error("Something went wrong!")

        }
    }

    return (
        <div className='mt-6'>
            <form onSubmit={handlePostOnboarding}>

                <div className='flex flex-col md:flex-row gap-6'>

                    {/* Tutorial Video */}
                    <div className='flex-1'>
                        <h3 className='text-[26px] text-[#161721] font-medium'>
                            Tutorial Video
                        </h3>

                        <div className='border border-[#D2D2D5] border-dashed px-4 py-6 rounded-[8px] mt-2'>

                            {/* VIDEO PREVIEW */}
                            {tutorialPreviewUrl && (
                                <video
                                    src={tutorialPreviewUrl}
                                    controls
                                    className='w-full h-auto max-h-[300px] rounded-[8px] block object-cover'
                                />
                            )}

                            {/* NO VIDEO UI */}
                            {!tutorialPreviewUrl && (
                                <div className='flex flex-col items-center justify-center py-16'>
                                    <UploadFileIcon />
                                    <p className='text-center mt-4'>Drag and drop files here</p>
                                </div>
                            )}

                            {/* FILE INPUT (hidden) */}
                            <input
                                id="tutorialFile"
                                type="file"
                                accept="video/*"
                                onChange={(e) => setTutorialVideoFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />

                            {/* BROWSE BUTTON ONLY */}
                            <div className='flex flex-col items-center mt-4'>
                                <label
                                    htmlFor="tutorialFile"
                                    className='py-4 px-6 rounded-[8px] bg-[#0b7680] text-white text-base cursor-pointer'
                                >
                                    {tutorialPreviewUrl ? "Browse File" : "Browse File"}
                                </label>
                            </div>

                        </div>

                        {/* Video Preview */}


                        <div className='flex flex-col mt-6'>
                            <label
                                htmlFor="tutorial_duration"
                                className='text-base text-[#161721]'
                            >
                                Set Unskippable Duration (sec)
                            </label>

                            <input
                                type="text"
                                id="tutorial_duration"
                                className='border py-3 px-2.5 rounded-[8px] mt-1.5'
                                value={tutorialUnskippableDuration}
                                onChange={(e) =>
                                    setTutorialUnskippableDuration(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Meeting Video */}
                    <div className='flex-1'>
                        <h3 className='text-[26px] text-[#161721] font-medium'>
                            Meeting Video
                        </h3>

                        <div className='border border-[#D2D2D5] border-dashed px-4 py-6 rounded-[8px] mt-2'>

                            {/* VIDEO PREVIEW */}
                            {meetingPreviewUrl && (
                                <video
                                    src={meetingPreviewUrl}
                                    controls
                                    className='w-full h-auto max-h-[300px] rounded-[8px] block object-cover'
                                />
                            )}

                            {/* NO VIDEO UI */}
                            {!meetingPreviewUrl && (
                                <div className='flex flex-col items-center justify-center py-16'>
                                    <UploadFileIcon />

                                    <p className='text-center mt-4'>
                                        Drag and drop files here
                                    </p>
                                </div>
                            )}

                            {/* HIDDEN INPUT */}
                            <input
                                id="meetingFile"
                                type="file"
                                accept="video/*"
                                onChange={(e) =>
                                    setMeetingVideoFile(e.target.files?.[0] || null)
                                }
                                className="hidden"
                            />

                            {/* BROWSE BUTTON */}
                            <div className='flex flex-col items-center mt-4'>
                                <label
                                    htmlFor="meetingFile"
                                    className='py-4 px-6 rounded-[8px] bg-[#0b7680] text-white text-base cursor-pointer'
                                >
                                    {meetingPreviewUrl ? "Browse File" : "Browse File"}
                                </label>
                            </div>

                        </div>

                        {/* Duration */}
                        <div className='flex flex-col mt-6'>
                            <label
                                htmlFor="meeting_duration"
                                className='text-base text-[#161721]'
                            >
                                Set Unskippable Duration (sec)
                            </label>

                            <input
                                type="text"
                                id="meeting_duration"
                                className='border py-3 px-2.5 rounded-[8px] mt-1.5'
                                value={meetingUnskippableDuration}
                                onChange={(e) =>
                                    setMeetingUnskippableDuration(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type='submit'
                        className='text-base text-white bg-[#0b7680] w-full rounded-[8px] py-4 cursor-pointer'
                    >
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    )
}