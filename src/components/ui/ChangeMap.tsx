import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

type ChangeMapProps = {
    changeMap: (name?: string) => void,
    maps: {name: string, map: any}[]
}

export const ChangeMap = ({changeMap, maps}: ChangeMapProps) => {
    const [showList, setShowList] = useState(false)

    const handleMapSelect = (name: string) => {
        changeMap(name)
        setShowList(false)
    }

    return (
        <div className="absolute z-20 top-4 left-4">
            <div className='relative flex justify-center items-center'>
                <button onClick={() => changeMap()} className='bg-teal-400 hover:bg-teal-500 transition-all text-white rounded-l-lg px-4 py-2 h-10 shadow-lg'>Change Map</button>
                <div onClick={() => setShowList(!showList)} className="px-4 py-2 bg-teal-400 hover:bg-teal-500 transition-all text-white rounded-r-lg h-10 flex items-center shadow-lg cursor-pointer">
                    <FaChevronDown />
                </div>   

                <div className={`absolute top-12 left-0 scale-0 bg-teal-400 transition-all transform origin-top overflow-hidden w-40 h-40 rounded-lg shadow-lg ${showList ? 'scale-100' : ''}`}>
                    {maps.map((map, index) => (
                        <div key={index} onClick={() => handleMapSelect(map.name)} className='px-4 py-2 hover:bg-teal-500 transition-all text-white cursor-pointer'>{map.name}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}