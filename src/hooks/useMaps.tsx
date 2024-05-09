import { useState, useEffect } from 'react';
import { BlendFunction } from 'postprocessing';
import { Texture } from 'three';
import { Environment } from '@react-three/drei'

import { MapType } from '../types';
import { loadHdrTexture } from '../components/helpers/loadHdrTexture';
import { FallbackBackground } from '../components/FallbackBackground';

type useMapsType = {
    setIsLoading: (value: boolean) => void;
}

export const useMaps = ({ setIsLoading }: useMapsType) => {
    const [maps, setMaps] = useState<MapType[]>([
        { name: 'Quarry', id: 'quarry', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined },
        { name: 'Metro', id: 'metro', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined },
    ]);
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

    const changeMap = ( name?: string ) => {
        let newMap;
        if (name) {
            newMap = maps.find(map => map.name === name);
        } else {
            const currentIndex = maps.findIndex(map => map.name === currentMap.name);
            newMap = maps[(currentIndex + 1) % maps.length];
        }
        if (newMap) setCurrentMap(newMap);
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