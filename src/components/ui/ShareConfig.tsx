import React, { useState } from 'react'
import { IoMdShare } from "react-icons/io";
import { createConfigQueryParams, getBaseUrl } from '../helpers/utils'
import { useAudio } from '../context/AudioContext'
import { Spinner } from './shared/Spinner'
import { FaCheckCircle } from 'react-icons/fa';

type ShareConfigProps = {
    noiseOpacity: number,
    bloomOpacity: number,
    brightness: number,
    isFlickering: boolean,
    flickerStrength: number
}

export const ShareConfig = ({ noiseOpacity, bloomOpacity, brightness, isFlickering, flickerStrength }: ShareConfigProps) => {
    const [isLinkCopied, setIsLinkCopied] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const { isAmbientPlaying, ambientVolume, isEffectsAudioPlaying, effectsVolume } = useAudio()

    const handleShareConfig = () => {
        setShowSpinner(true)
        const currentConfig = {
            noiseOpacity,
            bloomOpacity,
            brightness,
            isFlickering,
            flickerStrength,
            isAmbientPlaying,
            ambientVolume,
            isEffectsAudioPlaying,
            effectsVolume
        }
        const convertedToQueryParams = createConfigQueryParams(currentConfig)
        const baseUrl = getBaseUrl()
        const shareUrl = `${baseUrl}/?${convertedToQueryParams}`
        console.log(shareUrl)
        setIsLinkCopied(true)
        setTimeout(() => {
            setShowSpinner(false)
            setTimeout(() => {
                setIsLinkCopied(false)
            }, 2000)
        }, 2000)
    }
 
    return (
        <>
            { isLinkCopied ? (
                <div className='text-white'>
                    {showSpinner ? (
                        <div className='flex justify-center items-center space-x-2 text-xs text-white w-full mr-auto'>
                            <Spinner />
                        </div>
                    ) : (
                        <div className='flex justify-center items-center space-x-2 text-xs text-white w-fit mr-auto'>
                            <FaCheckCircle className='scale-150' />
                            <p className=''>Link Copied!</p>
                        </div>
                    )}
                </div>
            ) : (
                <div onClick={handleShareConfig} className='flex justify-center items-center space-x-2 text-xs text-teal-500 bg-teal-200 w-fit px-4 py-2 rounded-lg mr-auto hover:bg-white hover:text-teal-500 hover:shadow-md transition-all cursor-pointer'>
                    <IoMdShare className='scale-150' />
                    <p className=''>Share My Settings</p>
                </div>
            )}
        </>
    )
}