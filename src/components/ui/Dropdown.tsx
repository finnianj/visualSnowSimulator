import React, {useState} from 'react'

import { FaChevronDown, FaChevronLeft } from 'react-icons/fa'
import { getChildPositioning, getContainerPositioning } from '../helpers/positioning'

type DropdownProps = {
    children: React.ReactNode,
    title: string,
    side: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',
    classes?: string,
    onTitleClick?: () => void
}

export const Dropdown = ({ children, title, side, classes, onTitleClick }: DropdownProps) => {
    const [showList, setShowList] = useState(false)

    const childPositioning = getChildPositioning(side)
    const containerPositioning = getContainerPositioning(side)
    if (!childPositioning || !containerPositioning) return null

    return (
        <div className={`absolute z-20 ${containerPositioning} w-fit`}>
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

                <div className={`scale-0 ${showList ? 'scale-100' : ''} ${childPositioning} ${classes} absolute text-sm bg-teal-400 transition-all transform overflow-hidden w-full rounded-lg shadow-lg`}>
                    {children}
                </div>

            </div>
        </div>    
    )
}

const DropdownHeader = ({ title, showList, onClick, onTitleClick }: { title: string, showList: boolean, onClick: () => void, onTitleClick?: () => void }) => {
    return (
        <>
            <p className={`px-4 py-2 h-10 rounded-l-lg transition-all ${onTitleClick ? 'cursor-pointer hover:bg-teal-500' : 'cursor-default'}`} onClick={onTitleClick}>{title}</p>
            <div onClick={onClick} className="px-4 py-2 bg-teal-400 hover:bg-teal-500 transition-all text-white rounded-r-lg h-10 flex items-center shadow-lg cursor-pointer">
                {showList ? <FaChevronLeft /> : <FaChevronDown />}
            </div>   
        </>
    )
}
