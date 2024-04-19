import React, { useState } from 'react'

export const Info = () => {
    const [showInfo, setShowInfo] = useState(false)



    return (
        <div onClick={() => setShowInfo(true)} className='fixed bottom-4 left-4 z-20 bg-teal-500 text-white rounded-full p-4 shadow-md hover:cursor-pointer hover:bg-teal-600 transition-all'>
            Info
        </div>
    )
}