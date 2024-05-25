import React from 'react';

import { useTranslation } from 'react-i18next';
import { useEffects, useUI } from '@/components/context';

type FlickerWarningModalProps = {
    setShowFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
    setHasSeenFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
}


export const FlickerWarningModal = ({ setShowFlickerWarning, setHasSeenFlickerWarning }: FlickerWarningModalProps) => {
    const { t } = useTranslation(['modals', 'translation']);
    const { darkMode } = useUI();
    const { setIsFlickering } = useEffects();

    return (
        <div className={`flex flex-col items-center rounded-lg shadow-mg text-white p-4 ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'}`}>
            <div className='flex flex-col items-center text-slate-600 dark:text-slate-400'>
                <p className='text-lg font-bold text-center '>
                    {t('flickerWarning.title')}
                </p>
                <p className='text-center '>
                    {t('flickerWarning.description')}
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
                        {t('buttons.cancel', { ns: 'translation' })}
                    </button>
                    <button
                        className="mt- flex items-center justify-center bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-teal-600 dark:hover:bg-teal-700 transition-all "
                        onClick={() => {
                                setIsFlickering(true);
                                setHasSeenFlickerWarning(true);
                                setShowFlickerWarning(false);
                            }}
                    >
                        {t('buttons.continue', { ns: 'translation' })}
                    </button>
                </div>
            </div>
        </div>
    );
};