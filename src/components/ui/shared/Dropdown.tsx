import React, { useState } from 'react'

import { FaChevronDown, FaChevronLeft } from 'react-icons/fa'

type DropdownProps = {
    children: React.ReactNode,
    title: string,
    containerPosition?: string,
    childPosition?: string,
    onTitleClick?: () => void
}

export const Dropdown = ({ children, title, childPosition, containerPosition, onTitleClick }: DropdownProps) => {
    const [showList, setShowList] = useState(false)

    return (
        <div className={`absolute z-20 ${containerPosition ? containerPosition : ''} w-fit`}>
            <div className='relative flex bg-teal-400 h-fit rounded-lg shadow-mg justify-center items-center text-white'>
                <DropdownHeader 
                    title={title} 
                    showList={showList} 
                    onClick={() => setShowList(!showList)}
                    onTitleClick={
                        onTitleClick 
                        ? () => {
                            setShowList(false)
                            onTitleClick()
                        }
                        : undefined
                    }
                    />

                <div className={`scale-0 ${showList ? 'scale-100' : ''} ${childPosition ? childPosition : ''} absolute text-sm bg-teal-400 transition-all transform overflow-hidden w-full rounded-lg shadow-lg`}>
                    {children}
                </div>

            </div>
        </div>    
    )
}

const DropdownHeader = ({ title, showList, onClick, onTitleClick }: { title: string, showList: boolean, onClick: () => void, onTitleClick?: () => void }) => {
    return (
        <div className='flex items-center h-6 sm:h-10'>
            <p className={`px-2 sm:px-4 text-xs sm:text-base rounded-l-lg transition-all ${onTitleClick ? 'cursor-pointer hover:bg-teal-500' : 'cursor-default'}`} onClick={onTitleClick}>{title}</p>
            <div onClick={onClick} className="bg-teal-400 hover:bg-teal-500 transition-all text-white rounded-r-lg h-full px-2 flex items-center shadow-lg cursor-pointer">
                {showList ? <FaChevronLeft /> : <FaChevronDown />}
            </div>   
        </div>
    )
}
