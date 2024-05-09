import { useState } from 'react'
import { TabHeaders } from './components'
import { InfoModalContent } from './InfoModalContent'
import { FaMoon, FaSun } from "react-icons/fa";


export const InfoModal = () => {
    const [currentTab, setCurrentTab] = useState<string>('info')
    const [darkMode, setDarkMode] = useState<boolean>(false)

    return (
        <div className={`relative flex flex-col ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'} rounded-lg shadow-lg p-4`}>
            <div className="absolute top-2 left-2 flex justify-start">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-gray-400 rounded-full transition-all">
                    {darkMode ? <FaSun className='text-yellow-600' /> : <FaMoon className="text-gray-900" />}
                </button>
            </div>
            <TabHeaders 
                currentTab={currentTab} 
                setCurrentTab={setCurrentTab} 
            />
            <InfoModalContent
                currentTab={currentTab} 
            />
        </div>
    )
}