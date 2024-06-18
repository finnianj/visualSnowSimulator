import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FaPlus } from 'react-icons/fa';

import { MapType } from '@/components/types';
import { Dropdown } from '@/ui/shared/Dropdown';
import { Modal } from '@/ui/modals/Modal';
import { useAudio } from '@/components/context/AudioContext'
import { AddMap } from '@/ui/modals/AddMap';

type ChangeMapProps = {
    changeMap: ( map: MapType ) => void,
    currentMap: MapType,
    maps: MapType[],
    setShowAddMapModal: (open: boolean) => void,
}

export const ChangeMap = ({ changeMap, currentMap, maps, setShowAddMapModal }: ChangeMapProps) => {
    const { t } = useTranslation(['translation']);
    const [showList, setShowList] = useState(false);
    const { setAmbientAudioSrc } = useAudio();

    const handleMapSelect = (name?: string) => {
        setShowList(false);
        let newMap;
        if (name) {
            newMap = maps.find(map => map.name === name);
        } else {
            const currentIndex = maps.findIndex(map => map.name === currentMap.name);
            newMap = maps[(currentIndex + 1) % maps.length];
        }

        if (!newMap) return;
        const newAmbientAudio = newMap.audio || '';
        // console.log('Setting ambient audio to: ', newAmbientAudio);
        setAmbientAudioSrc(newAmbientAudio);
        changeMap(newMap);
    }

    return (
        <>
            <Dropdown 
                title={t('changeMapPanel.title')} 
                onTitleClick={() => handleMapSelect()} 
                childPosition={'origin-top-right top-12 !overflow-hidden sm:top-12 right-0'} 
                containerPosition='right-4 top-4'
                showList={showList}
                setShowList={setShowList}
            >
                <>
                    {maps.map((map, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleMapSelect(map.name)} 
                            className='px-4 py-2 hover:bg-teal-500 text-xxs sm:text-base transition-all text-white cursor-pointer'
                        >
                            {t(`changeMapPanel.maps.${map.id}`)}
                        </div>
                    ))}
                    <hr className='mx-4'></hr>
                    {/* Add map button */}
                    <div 
                        onClick={() => setShowAddMapModal(true)} 
                        className='px-4 py-2 hover:opacity-80 bg-teal-400 text-white text-xxs sm:text-xs flex justify-start items-center transition-all cursor-pointer'
                    >
                        {/* {t('changeMapPanel.addMap')} */}
                        <FaPlus className='mr-2' />
                        Add custom map (with walkthrough)
                    </div>
                </>
            </Dropdown>
        </>

    )
}