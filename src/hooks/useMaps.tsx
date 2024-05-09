import { useState, useEffect } from 'react';
import { BlendFunction } from 'postprocessing';
import { Texture } from 'three';
import { Environment } from '@react-three/drei'

import { MapType } from '../types';
import { loadHdrTexture } from '../components/helpers/loadHdrTexture';
import { FallbackBackground } from '../components/FallbackBackground';

import { defaultMaps } from '../components/maps/defaultMaps';

type useMapsType = {
    setIsLoading: (value: boolean) => void;
}

export const useMaps = ({ setIsLoading }: useMapsType) => {
    const [maps, setMaps] = useState<MapType[]>(defaultMaps);
    const [currentMap, setCurrentMap] = useState(maps[0])
    const [mapTexture, setMapTexture] = useState<Texture | undefined>(undefined)

    useEffect(() => {
        setIsLoading(true)
        if (currentMap.texture) {
            setMapTexture(currentMap.texture)
            setIsLoading(false)
            return;
        }
        const loadMap = async () => {
            await loadHdrTexture(`./environmentMaps/hdri/${currentMap.id}.hdr`).then((texture) => {
                setMapTexture(texture);
                // Add texture to maps array
                setMaps(maps.map(map => {
                    if(map.name === currentMap.name) {
                        return {...map, texture}
                    }
                    return map;
                }))
                setIsLoading(false)
            })
        }
        loadMap();
    }, [currentMap])

    const changeMap = ( map: MapType ) => {
        setCurrentMap(map);
    }

    const FallbackBackgroundComponent = () => {
        if (mapTexture) return null;

        return (
            <FallbackBackground />
        )
    }

    const BackgroundComponent = () => {
        if (!mapTexture) return null;
        
        return <Environment map={mapTexture} background />
    }

    return {
        maps,
        currentMap,
        setCurrentMap,
        mapTexture,
        setMapTexture,
        changeMap,
        BackgroundComponent,
        FallbackBackgroundComponent
    }
};