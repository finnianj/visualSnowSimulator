import { useState } from 'react'
import { TabHeaders } from './components'
import { InfoModalContent } from './InfoModalContent'

export const InfoModal = () => {
    const [currentTab, setCurrentTab] = useState<string>('info')
    return (
        <div className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-4">
            <TabHeaders 
                currentTab={currentTab} 
                setCurrentTab={setCurrentTab} 
            />
            <InfoModalContent currentTab={currentTab} />
        </div>
    )
}