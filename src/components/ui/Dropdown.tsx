import React, {useState} from 'react'

import { FaChevronDown, FaChevronLeft } from 'react-icons/fa'

type DropdownProps = {
    children: React.ReactNode,
    title: string,
    side?: 'left' | 'right',
    classes?: string
}

export const Dropdown = ({ children, title, side, classes }: DropdownProps) => {
    const [showList, setShowList] = useState(false)

    const positioning = 
        side === 'left' 
        ? 'origin-top-left top-12 right-0' 
        : 'origin-top-lefright top-12 left-0'

    return (
        <div className={`absolute z-20 top-4 ${side}-4 w-fit`}>
            <div className='relative flex bg-teal-400 h-fit rounded-lg shadow-mg justify-center items-center text-white'>
                <DropdownHeader 
                    title={title} 
                    showList={showList} 
                    onClick={() => setShowList(!showList)}
                />

                <div className={`scale-0 ${showList ? 'scale-100' : ''} ${positioning} ${classes} absolute text-sm bg-teal-400 transition-all transform overflow-hidden w-full rounded-lg shadow-lg`}>
                    {children}
                </div>

            </div>
        </div>    
    )
}

const DropdownHeader = ({ title, showList, onClick }: { title: string, showList: boolean, onClick: () => void }) => {
    return (
        <>
            <p className='px-4 py-2 h-10 cursor-default'>{title}</p>
            <div onClick={onClick} className="px-4 py-2 bg-teal-400 hover:bg-teal-500 transition-all text-white rounded-r-lg h-10 flex items-center shadow-lg cursor-pointer">
                {showList ? <FaChevronLeft /> : <FaChevronDown />}
            </div>   
        </>
    )
}