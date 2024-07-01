import { useState, useEffect, SetStateAction } from 'react';
import { BlendFunction } from 'postprocessing';
import { Texture } from 'three';
import { Environment } from '@react-three/drei'
import { useEffects } from '@/components/context';

import { MapType } from '@/components/types';
import { loadHdrTexture } from '@/components/helpers/loadHdrTexture';
import { FallbackBackground } from '@/components/maps/FallbackBackground';

import { defaultMaps } from '@/components/maps/defaultMaps';

import { useLoading } from '@/components/context';

export const useMaps = () => {
    const { isLoading, setIsLoading } = useLoading();
    const { key, setKey } = useEffects();
    const [maps, setMaps] = useState<MapType[]>(defaultMaps);
    const [currentMap, setCurrentMap] = useState(maps[0])
    const [mapTexture, setMapTexture] = useState<Texture | undefined>(undefined)
    const [firstMapLoaded, setFirstMapLoaded] = useState(false)
    const isMobile = window.innerWidth < 768;


    useEffect(() => {
        setIsLoading(true)
        if (currentMap.texture) {
            setMapTexture(currentMap.texture)
            setIsLoading(false)
            // Refresh effects composer once the map is loaded after delay or snow will not be visible
            setTimeout(() => {
                setKey(key + 1)
            }, 100)
            return;
        }
        const loadMap = async () => {
            const path = isMobile ? `./environmentMaps/hdri/mobile/${currentMap.id}.hdr` : `./environmentMaps/hdri/${currentMap.id}.hdr`
            await loadHdrTexture(path).then((texture: Texture) => {
                setMapTexture(texture);
                // Add texture to maps array
                setMaps(maps.map(map => {
                    if(map.name === currentMap.name) {
                        return {...map, texture}
                    }
                    return map;
                }))
                setIsLoading(false)
                setFirstMapLoaded(true)
                // Refresh effects composer once the map is loaded after delay or snow will not be visible
                setTimeout(() => {
                    setKey(key + 1)
                }, 100)
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
        setMaps,
        currentMap,
        setCurrentMap,
        mapTexture,
        setMapTexture,
        changeMap,
        BackgroundComponent,
        FallbackBackgroundComponent,
        firstMapLoaded  
    }
};