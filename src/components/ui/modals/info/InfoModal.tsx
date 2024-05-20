import { useState } from 'react'

import { useUI } from '../../../context';
import { TabHeaders, ModalIcons, InfoModalContent } from './components'

export const InfoModal = ({ setShowInfo }: { setShowInfo: (show: boolean) => void }) => {
    const { darkMode, setDarkMode } = useUI()
    const [currentTab, setCurrentTab] = useState<string>('info')

    return (
        <div className={`relative flex flex-col ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'} rounded-lg shadow-lg h-[calc(100vh-120px)] sm:h-fit m-4 overflow-y-scroll`}>
            <div className={`${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'} sticky top-0 pb-0 pt-6 sm:pt-0`}>
                <ModalIcons
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    setShowInfo={setShowInfo}
                />
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