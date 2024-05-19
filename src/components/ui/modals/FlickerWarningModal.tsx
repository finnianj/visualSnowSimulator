import React, { useState } from 'react';

import { useEffects } from '../../context';

type FlickerWarningModalProps = {
    setShowFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
    setHasSeenFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
}


export const FlickerWarningModal = ({ setShowFlickerWarning, setHasSeenFlickerWarning }: FlickerWarningModalProps) => {

    const { setIsFlickering, darkMode } = useEffects();

    return (
        <div className={`flex flex-col items-center sm:mt-64 rounded-lg shadow-mg text-white p-4 ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'}`}>
            <div className='flex flex-col items-center text-slate-600 dark:text-slate-400'>
                <p className='text-lg font-bold text-center '>Warning</p>
                <p className='text-center '>
                    Flickering effects can cause seizures in people with photosensitive epilepsy.
                </p>
                <div className='flex justify-between mt-4 w-full text-sm'>
                    <button
                        className="mt- flex items-center justify-center bg-slate-500 dark:bg-slate-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-slate-600 dark:hover:bg-slate-700 transition-all "
                        onClick={() => {
                                setIsFlickering(false);
                                setHasSeenFlickerWarning(true);
                                setShowFlickerWarning(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="mt- flex items-center justify-center bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-teal-600 dark:hover:bg-teal-700 transition-all "
                        onClick={() => {
                                setIsFlickering(true);
                                setHasSeenFlickerWarning(true);
                                setShowFlickerWarning(false);
                            }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}