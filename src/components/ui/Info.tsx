import React, { useState } from 'react'

export const Info = () => {
    const [showInfo, setShowInfo] = useState(false)



    return (
        <div className='fixed bottom-4 left-4 z-20 bg-slate-500 text-white rounded-full p-4'>
            Info
        </div>
    )
}