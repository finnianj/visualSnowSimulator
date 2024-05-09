import { MapType } from '../../types'
import { Dropdown } from './Dropdown'
import { useAudio } from '../context/AudioContext'

type ChangeMapProps = {
    changeMap: ( map: MapType ) => void,
    currentMap: MapType,
    maps: MapType[]
}

export const ChangeMap = ({changeMap, currentMap, maps}: ChangeMapProps) => {
    const { setAmbientAudioSrc } = useAudio();

    const handleMapSelect = (name?: string) => {
        let newMap;
        if (name) {
            newMap = maps.find(map => map.name === name);
        } else {
            const currentIndex = maps.findIndex(map => map.name === currentMap.name);
            newMap = maps[(currentIndex + 1) % maps.length];
        }

        if (!newMap) return;
        const newAmbientAudio = newMap.audio || '';
        setAmbientAudioSrc(newAmbientAudio);
        changeMap(newMap);
    }

    return (
        <Dropdown title='Change Map' side='top-right' onTitleClick={() => handleMapSelect()}>
            <>
                {maps.map((map, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleMapSelect(map.name)} 
                        className='px-4 py-2 hover:bg-teal-500 transition-all text-white cursor-pointer'
                    >
                            {map.name}
                    </div>
                ))}
            </>
        </Dropdown>

    )
}