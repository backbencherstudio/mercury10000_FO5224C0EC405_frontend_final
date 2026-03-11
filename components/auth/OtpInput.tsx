'use client'

import React, { useState, useRef, useEffect } from 'react'

interface OTPInputProps {
    length?: number
    onComplete?: (otp: string) => void
    containerClassName?: string
    inputClassName?: string
    autoFocus?: boolean
}

export default function OTPInput({ 
    length = 6, 
    onComplete, 
    containerClassName = "",
    inputClassName = "",
    autoFocus = true 
}: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (autoFocus) {
            inputRefs.current[0]?.focus()
        }
    }, [autoFocus])

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (isNaN(Number(value))) return

        const newOtp = [...otp]
     
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        // Move to next input if current field is filled
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }

        // Check if OTP is complete
        const combinedOtp = newOtp.join('')
        if (combinedOtp.length === length && onComplete) {
            onComplete(combinedOtp)
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current field is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
        
        // Move to next input on right arrow
        if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
        
        // Move to previous input on left arrow
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length)
        
        if (!/^\d+$/.test(pastedData)) return

        const newOtp = [...otp]
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i]
        }
        setOtp(newOtp)

        // Focus the next empty field or last field
        const nextEmptyIndex = newOtp.findIndex(val => val === '')
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus()
        } else {
            inputRefs.current[length - 1]?.focus()
            if (onComplete) {
                onComplete(newOtp.join(''))
            }
        }
    }

    return (
        <div className={`flex justify-center gap-2 md:gap-3 lg:gap-4 ${containerClassName}`}>
            {otp.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={value}
                    ref={(ref) => {
                        inputRefs.current[index] = ref
                    }}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold border border-[#c5c5c5] rounded-[8px] focus:outline-none focus:border-[#0e93a1] focus:ring-1 focus:ring-[#0e93a1] transition-colors ${inputClassName}`}
                    aria-label={`Digit ${index + 1}`}
                />
            ))}
        </div>
    )
}