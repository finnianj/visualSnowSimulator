import { MapType } from '../../../types'
import { Dropdown } from '../shared/Dropdown'
import { useAudio } from '../../context/AudioContext'

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
        console.log('Setting ambient audio to: ', newAmbientAudio);
        setAmbientAudioSrc(newAmbientAudio);
        changeMap(newMap);
    }

    return (
        <Dropdown title='Change Map' onTitleClick={() => handleMapSelect()} childPosition={'origin-top-right top-8 !overflow-hidden sm:top-12 right-0'} containerPosition='right-4 top-4'>
            <>
                {maps.map((map, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleMapSelect(map.name)} 
                        className='px-4 py-2 hover:bg-teal-500 text-xxs sm:text-base transition-all text-white cursor-pointer'
                    >
                        {map.name}
                    </div>
                ))}
            </>
        </Dropdown>

    )
}