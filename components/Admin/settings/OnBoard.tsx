"use client"
import CrossIcon from '@/components/icons/admin/CrossIcon'
import Mp4Icon from '@/components/icons/admin/Mp4Icon'
import UploadFileIcon from '@/components/icons/admin/UploadFileIcon'
import { usePostOnboardingMutation } from '@/redux/features/settings/settings'
import React, { useState } from 'react'

export default function OnBoard() {
    const [postOnboarding] = usePostOnboardingMutation()
    
    // States for files
    const [tutorialVideoFile, setTutorialVideoFile] = useState<File | null>(null)
    const [meetingVideoFile, setMeetingVideoFile] = useState<File | null>(null)
    
    // States for duration
    const [tutorialUnskippableDuration, setTutorialUnskippableDuration] = useState("30")
    const [meetingUnskippableDuration, setMeetingUnskippableDuration] = useState("30")

    const handlePostOnboarding = async (e: React.FormEvent) => {
        e.preventDefault(); // <-- Very important to prevent page reload
        try {
            const payload = new FormData()
           if (meetingVideoFile) payload.append("meeting_video_file", meetingVideoFile)
            if (tutorialVideoFile) payload.append("tutorial_video_file", tutorialVideoFile)
            payload.append("meeting_unskippable_duration", meetingUnskippableDuration)
            payload.append("tutorial_unskippable_duration", tutorialUnskippableDuration)
            
            // Pass the FormData inside { data: ... } as defined in your settings.ts RTK query
            const result = await postOnboarding({ data: payload }).unwrap()
            console.log("Success:", result)
        } catch (error) {
            console.log("Error:", error)
        }
    }

    return (
        <div className=' mt-6'>
           <form onSubmit={handlePostOnboarding}>
            
             <div className=' flex flex-col md:flex-row gap-6'>
                <div className=' flex-1'>
                    <h3 className=' text-[26px] text-[#161721] font-medium'>Tutorial Video</h3>
                    <p className='text-base text-[#161721] mt-6'>Upload a video you want to view the users as tutorial </p>
                    <div className=' space-y-6'>

                        <div className=' border border-[#D2D2D5] border-dashed px-4 py-20 rounded-[8px] mt-2 relative'>
                            <div className=' flex flex-col items-center justify-center'>
                                <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={(e) => setTutorialVideoFile(e.target.files?.[0] || null)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <UploadFileIcon />
                                <div className=' my-4 '>
                                    <p className=' text-center  '>{tutorialVideoFile ? tutorialVideoFile.name : 'Drag and drop files here'}</p>
                                    {!tutorialVideoFile && <p className=' text-center  mt-2'>OR</p>}
                                </div>
                                <button type="button" className=' py-4 px-6 rounded-[8px] bg-[#0b7680] text-white text-base cursor-pointer pointer-events-none'>Browse File</button>

                            </div>
                        </div>
                        <div className=' flex flex-col'>
                            <label htmlFor="tutorial_duration" className=' text-base text-[#161721] '>Set Unskippable Duration (sec)</label>
                            <input 
                                type="text" 
                                id="tutorial_duration" 
                                className=' border py-3 px-2.5  rounded-[8px] mt-1.5' 
                                value={tutorialUnskippableDuration}
                                onChange={(e)=>setTutorialUnskippableDuration(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                <div className=' flex-1'>
                    <h3 className=' text-[26px] text-[#161721] font-medium'>Meeting Video</h3>
                    <p className='text-base text-[#161721] mt-6'>Upload a video you want to view the users regarding meeting </p>
                    <div className=' space-y-6'>

                        <div className=' border border-[#D2D2D5] border-dashed px-4 py-20 rounded-[8px] mt-2 relative'>
                            <div className=' flex flex-col items-center justify-center'>
                                  <input 
                                      type="file" 
                                      accept="video/*"
                                      onChange={(e) => setMeetingVideoFile(e.target.files?.[0] || null)}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                <UploadFileIcon />
                                <div className=' my-4 '>
                                    <p className=' text-center  '>{meetingVideoFile ? meetingVideoFile.name : 'Drag and drop files here'}</p>
                                    {!meetingVideoFile && <p className=' text-center  mt-2'>OR</p>}
                                </div>
                                <button type="button" className=' py-4 px-6 rounded-[8px] bg-[#0b7680] text-white text-base cursor-pointer pointer-events-none'>Browse File</button>

                            </div>
                        </div>
                        <div className=' flex flex-col'>
                            <label htmlFor="meeting_duration" className=' text-base text-[#161721] '>Set Unskippable Duration (sec)</label>
                            <input 
                                type="text" 
                                id="meeting_duration" 
                                className=' border py-3 px-2.5  rounded-[8px] mt-1.5' 
                                value={meetingUnskippableDuration}
                                onChange={(e)=>setMeetingUnskippableDuration(e.target.value)}  
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button type='submit' className=' text-base text-white bg-[#0b7680] w-full rounded-[8px] py-4 cursor-pointer '>Save Changes</button>
            </div>
           </form>
        </div>
    )
}
