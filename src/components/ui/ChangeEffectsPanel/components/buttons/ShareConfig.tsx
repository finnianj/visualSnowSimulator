import React, { useState } from 'react'

import { useEffects } from '../../../../context';
import { useAudio } from '../../../../context/AudioContext'

import { createConfigQueryParams, getBaseUrl, copyToClipboard } from '../../../../helpers/utils'
import { Spinner } from '../../../shared/Spinner'
import { DefaultTooltip } from '../../../shared/DefaultTooltip'

import { IoMdShare } from "react-icons/io";
import { FaCheckCircle } from 'react-icons/fa';

export const ShareConfig = () => {
    const { 
        noiseOpacity, 
        bloomOpacity, 
        brightness, 
        isFlickering, 
        flickerStrength,
        smallEyeFloatersEnabled,
        largeEyeFloatersEnabled,
        smallEyeFloatersCount,
        largeEyeFloatersCount,
        smallEyeFloatersSize,
        largeEyeFloatersSize,
        smallEyeFloatersTransparency,
        largeEyeFloatersTransparency,
        nauseaEnabled,
        vignetteStrength,
    } = useEffects()

    const [isLinkCopied, setIsLinkCopied] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const handleShareConfig = () => {
        setShowSpinner(true)
        const currentConfig = {
            noiseOpacity,
            bloomOpacity,
            brightness,
            isFlickering,
            flickerStrength,
            smallEyeFloatersEnabled,
            largeEyeFloatersEnabled,
            smallEyeFloatersCount,
            largeEyeFloatersCount,
            smallEyeFloatersSize,
            largeEyeFloatersSize,
            smallEyeFloatersTransparency,
            largeEyeFloatersTransparency,
            nauseaEnabled,
            vignetteStrength,
        }
        const convertedToQueryParams = createConfigQueryParams(currentConfig)
        const baseUrl = getBaseUrl()
        const shareUrl = `${baseUrl}/?${convertedToQueryParams}`
        console.log('Share URL: ', shareUrl)
        copyToClipboard(shareUrl)
        setIsLinkCopied(true)
        setTimeout(() => {
            setShowSpinner(false)
            setTimeout(() => {
                setIsLinkCopied(false)
            }, 3000)
        }, 1000)
    }
 
    return (
        <>
            { isLinkCopied  ? (
                <div className='text-white'>
                    {showSpinner? (
                        <div className='flex justify-start items-center space-x-2 px-4 text-xs text-white w-fit h-6'>
                            <Spinner />
                        </div>
                    ) : (
                        <div className='flex justify-center items-center space-x-2 text-xs text-white w-fit h-6'>
                            <FaCheckCircle className='scale-150' />
                            <p className=''>Link Copied!</p>
                        </div>
                    )}
                </div>
            ) : (
                <div onClick={handleShareConfig} className='relative group/tooltip flex justify-center items-center space-x-2 text-xs text-teal-500 bg-teal-200 w-fit px-4 h-6 rounded-lg mx-auto hover:bg-white hover:text-teal-500 hover:shadow-md transition-all cursor-pointer'>
                    <IoMdShare className='scale-150' />
                    <DefaultTooltip text='Share current configuration' classes='top-6 left-4 origin-top-left z-50' />
                </div>
            )}
        </>
    )
}