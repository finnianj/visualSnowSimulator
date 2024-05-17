import React, { useState } from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { Modal } from './modals/Modal';
import { InfoModal } from './modals/info/InfoModal';

export const Info = () => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <>
            <div 
                onClick={() => setShowInfo(true)} 
                className='fixed group bottom-0 left-0 z-20 bg-teal-500 text-white rounded-tr-full p-4 shadow-md hover:cursor-pointer  hover:scale-110 transition-all shiny-effect'
            >
                <FaInfoCircle className='w-8 h-8 text-teal-100 -translate-x-2 translate-y-2  group-hover:text-white transition-all' />
            </div>

            <Modal modalOpen={showInfo} setModalOpen={setShowInfo}>
                <InfoModal setShowInfo={setShowInfo} />
            </Modal>
        </>
    )
}