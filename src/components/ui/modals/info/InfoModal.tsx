import { useState } from 'react'
import { TabHeaders } from './components'
import { InfoModalContent } from './InfoModalContent'
import { FaMoon, FaSun } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useEffects } from '../../../context';

export const InfoModal = ({ setShowInfo }: { setShowInfo: (show: boolean) => void }) => {
    const { darkMode, setDarkMode } = useEffects()
    const [currentTab, setCurrentTab] = useState<string>('info')

    return (
        <div className={`relative flex flex-col ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'} rounded-lg shadow-lg h-[calc(100vh-120px)] sm:h-fit m-4 overflow-y-scroll`}>
            <div className={`${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'} sticky top-0 p-4 pb-0`}>
                <div className="absolute top-2 left-2 flex justify-start ">
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
                        {darkMode ? <FaSun className='text-yellow-600 hover:opacity-75 transition-all' /> : <FaMoon className="text-gray-900" />}
                    </button>
                </div>
                <div className="absolute top-2 right-2 flex justify-end ">
                    <button onClick={() => setShowInfo(false)} className="p-2 hover:opacity-75 transition-all scale-150">
                        <MdClose className="text-gray-900 dark:text-gray-400" />
                    </button>
                </div>
                <TabHeaders 
                    currentTab={currentTab} 
                    setCurrentTab={setCurrentTab} 
                />
            </div>
            <InfoModalContent
                currentTab={currentTab} 
            />
        </div>
    )
}