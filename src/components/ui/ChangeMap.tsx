import React, { useState } from 'react'
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa'
import { MapType } from '../../types'
import { Dropdown } from './Dropdown'

type ChangeMapProps = {
    changeMap: ( name?: string ) => void,
    maps: MapType[]
}

export const ChangeMap = ({changeMap, maps}: ChangeMapProps) => {
    const [showList, setShowList] = useState(false)

    const handleMapSelect = (name: string) => {
        changeMap(name)
        setShowList(false)
    }

    return (
        <Dropdown title='Change Map' side='top-right' onTitleClick={() => changeMap()}>
            <>
                {maps.map((map, index) => (
                    <div key={index} onClick={() => handleMapSelect(map.name)} className='px-4 py-2 hover:bg-teal-500 transition-all text-white cursor-pointer'>{map.name}</div>
                ))}
            </>
        </Dropdown>

    )
}