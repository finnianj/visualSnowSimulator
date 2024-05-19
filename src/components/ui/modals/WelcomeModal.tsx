import { useUI, useEffects } from "../../context"

import { FaMoon, FaSun } from "react-icons/fa"

type UserConfigLoadedModalProps = {
    prevConfig?: {[key: string]: string};
    setShowWelcomeModal: (show: boolean) => void;
}

export const WelcomeModal = ({ prevConfig, setShowWelcomeModal }: UserConfigLoadedModalProps) => {
    const configProvided = prevConfig && Object.keys(prevConfig).length > 0
    const name = prevConfig?.name || null
    const isFlickering = prevConfig?.isFlickering === 'true'
    
    const { darkMode, setDarkMode } = useUI()
    const { setIsFlickering, setDisableAllEffects } = useEffects()

    const handleContinueAnyway = () => {
        // Continue anyway
        setShowWelcomeModal(false)
        setDisableAllEffects(false)
    }

    const handleDisableFlickering = () => {
        // Disable flickering
        setIsFlickering(false)
        setDisableAllEffects(false)
        setShowWelcomeModal(false)
    }

    return (
        <div className={`max-w-4xl relative mx-auto p-4 text-left text-slate-500 ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'} rounded-lg shadow-md flex flex-col`}>
            
             {/* Dark mode icon */}
             <div className="absolute top-2 left-2">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
                    {darkMode ? <FaSun className='text-yellow-600 hover:opacity-75 transition-all' /> : <FaMoon className="text-gray-900" />}
                </button>
            </div> 
            
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">
                Welcome 
            </h3>

            <div className="flex flex-col space-y-4">
            <img src='./images/logoNoText.png' alt='logo' className='w-32 h-32 rounded-full mx-auto my-2 shadow-md' />

                <p className="mt-2">
                    Welcome to the <span className="text-teal-500 font-bold">Visual Snow Simulator</span>! This tool is designed to help simulate the visual effects of Visual Snow Syndrome. You can use it to understand and share what it's like to experience Visual Snow.
                </p>
                {!configProvided ? (
                    <>
                        <button
                            className="flex items-center justify-end bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 mx-auto hover:bg-teal-600 dark:hover:bg-teal-700 transition-all"
                            onClick={handleDisableFlickering}
                        >
                            Go
                        </button>
                    </>
                ) : (
                    <>

                    <p className="mt-2">
                        You are now using <span className="font-bold text-teal-500">{name}</span>'s settings.
                    </p>
                    {isFlickering && (
                        <>
                            <p className="mt-2 text-red-500">
                                Warning: The current settings include flickering effects, which could trigger epilepsy. Would you like to disable them? You can turn them back on later.
                            </p>
                            <div className="flex justify-between mt-4 w-full text-sm">
                                <button
                                    className="flex items-center justify-center bg-slate-500 dark:bg-slate-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-slate-600 dark:hover:bg-slate-700 transition-all"
                                    onClick={handleContinueAnyway}
                                >
                                    Continue Anyway
                                </button>
                                <button
                                    className="flex items-center justify-center bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-teal-600 dark:hover:bg-teal-700 transition-all"
                                    onClick={handleDisableFlickering}
                                >
                                    Disable Flickering
                                </button>
                            </div>
                        </>
                    )}
                    </>
                )}
            </div>
        </div>
    )
}