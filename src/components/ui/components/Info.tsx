import { useState } from 'react'

import { Modal } from '@/ui/modals/Modal';
import { InfoModal } from '@/ui/modals/info/InfoModal';
import { DefaultTooltip } from '@/ui/shared/DefaultTooltip';

import { FaInfoCircle } from "react-icons/fa";

export const Info = () => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <>
            <div className='relative group/tooltip'>
                <div 
                    onClick={() => setShowInfo(true)} 
                    className='fixed bottom-0 left-0 z-10 bg-teal-500 text-white rounded-tr-full p-4 shadow-md hover:cursor-pointer hover:scale-110 transition-all shiny-effect'
                >
                    <FaInfoCircle className='w-8 h-8 text-teal-100 -translate-x-2 translate-y-2  group-hover/tooltip:text-white transition-all' />
                </div>
                
                <DefaultTooltip text={'Info'} classes={`!fixed !left-16 !bottom-10 origin-left`} />
            </div>

            <Modal modalOpen={showInfo} setModalOpen={setShowInfo}>
                <InfoModal setShowInfo={setShowInfo} />
            </Modal>
        </>
    )
}