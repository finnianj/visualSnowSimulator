import React, { useState } from 'react'
import { useEffects, useUI } from '../../context';
import { createConfigQueryParams, getBaseUrl, copyToClipboard } from '../../helpers/utils'
import { Spinner } from '../shared/Spinner'
import { DefaultTooltip } from '../shared/DefaultTooltip'
import { FaCheckCircle } from 'react-icons/fa'
import { IoMdShare } from 'react-icons/io'


export const ShareConfigModal = () => {
    const { darkMode, name, setName } = useUI()
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
        dizzinessEnabled,
        vignetteStrength,
    } = useEffects()

    const [isLinkCopied, setIsLinkCopied] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const handleShareConfig = () => {
        setShowSpinner(true)
        const currentConfig = {
            name,
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
            dizzinessEnabled,
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
        <div className={`flex flex-col items-center rounded-lg shadow-mg text-white min-w-24 max-w-3xl p-4 ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'}`}>
            <div className='flex flex-col items-center text-slate-600 dark:text-slate-400 space-y-4 text-left'>
                <p className='text-lg font-bold text-center'>Share your experience</p>
                <p>
                    Share your current configuration with others by entering your name and generating a link. Anyone who visits the link will see the same settings you have.
                </p>
                {/* Name input */}
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-2 mt-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-slate-600 dark:text-slate-400 outline-none'
                />

                { isLinkCopied ? (
                <div className='text-teal-500 dark:text-teal-400'>
                    {showSpinner? (
                        <div className='flex justify-start items-center space-x-2 px-4 text-xs w-fit h-6'>
                            <Spinner />
                        </div>
                    ) : (
                        <div className='flex justify-center items-center space-x-2 text-xs w-fit h-6'>
                            <FaCheckCircle className='scale-150' />
                            <p className=''>Link Copied!</p>
                        </div>
                    )}
                </div>
            ) : (
                <div onClick={handleShareConfig} className='relative group/tooltip flex justify-center items-center space-x-2 text-xs bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white w-fit px-6 py-2 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-700 hover:shadow-md transition-all cursor-pointer'>
                    Generate Link
                </div>
            )}
               
            </div>
        </div>
    )
}