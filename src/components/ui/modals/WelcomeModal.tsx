import { useUI, useEffects } from "@/components/context"
import { useTranslation, Trans } from "react-i18next";

import { FaMoon, FaSun } from "react-icons/fa"

type UserConfigLoadedModalProps = {
    prevConfig?: {[key: string]: string};
    setShowWelcomeModal: (show: boolean) => void;
}

export const WelcomeModal = ({ prevConfig, setShowWelcomeModal }: UserConfigLoadedModalProps) => {
    const { t } = useTranslation(['translation', 'modals'])
    const configProvided = prevConfig && Object.keys(prevConfig).length > 0
    const isFlickering = prevConfig?.isFlickering === 'true'
    const { darkMode, setDarkMode, setHasSeenFlickerWarning } = useUI()
    const { setIsFlickering } = useEffects()

    const simulator = 'Visual Snow Simulator'
    const name = prevConfig?.name || t('modals.welcomeModal.unnamedPerson')
    

    const handleContinueAnyway = () => {
        // Continue anyway
        setHasSeenFlickerWarning(true)
        setShowWelcomeModal(false)
    }

    const handleDisableFlickering = () => {
        // Disable flickering
        setIsFlickering(false)
        setHasSeenFlickerWarning(true)
        setShowWelcomeModal(false)
    }

    return (
        <div className={`max-w-4xl relative mx-auto p-4 text-left text-slate-500 ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'} rounded-lg shadow-md flex flex-col`}>
            
            <div className="absolute top-2 left-2">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
                    {darkMode ? <FaSun className='text-yellow-600 hover:opacity-75 transition-all' /> : <FaMoon className="text-gray-900" />}
                </button>
            </div>
            
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">
                {t('welcomeModal.title', { ns: 'modals' })}
            </h3>

            <div className="flex flex-col space-y-4">
                <img src='./images/logoNoText.png' alt='logo' className='w-32 h-32 rounded-full mx-auto my-2 shadow-md' />

                <p className="mt-2">
                    <Trans
                        i18nKey={'modals:welcomeModal.description'}
                        values = {{ simulator }}
                        components={{ 1: <span className='font-bold text-teal-500'>{simulator}</span> }}
                    /> 
                </p>
                {!configProvided ? (
                    <>
                        <button
                            className="flex items-center justify-end bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 mx-auto hover:bg-teal-600 dark:hover:bg-teal-700 transition-all"
                            onClick={handleDisableFlickering}
                        >
                            {t('buttons.go', { ns: 'translation'})}
                        </button>
                    </>
                ) : (
                    <>
                        <p className="mt-2">
                            <Trans
                                i18nKey="modals.welcomeModal.settingsUsed"
                                values = {{ name }}
                                components={{ 1: <span className='font-bold text-teal-500'>{name}</span> }}
                            /> 
                        </p>
                        {isFlickering ? (
                            <>
                                <p className="mt-2 text-red-500">
                                    <span className="font-bold">{t('modals.welcomeModal.warning')}</span>: {t('modals.welcomeModal.flickeringWarning')}
                                </p>
                                <div className="flex justify-between mt-4 w-full text-sm">
                                    <button
                                        className="flex items-center justify-center bg-slate-500 dark:bg-slate-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-slate-600 dark:hover:bg-slate-700 transition-all"
                                        onClick={handleContinueAnyway}
                                    >
                                        {t('buttons.continueAnyway')}
                                    </button>
                                    <button
                                        className="flex items-center justify-center bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-teal-600 dark:hover:bg-teal-700 transition-all"
                                        onClick={handleDisableFlickering}
                                    >
                                        {t('buttons.disableFlickering')}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    className="flex items-center justify-end bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 mx-auto hover:bg-teal-600 dark:hover:bg-teal-700 transition-all"
                                    onClick={handleContinueAnyway}
                                >
                                    {t('buttons.go')}
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}