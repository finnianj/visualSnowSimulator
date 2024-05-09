import React, { useEffect, useState, Suspense, startTransition, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Noise, Bloom, BrightnessContrast, LensFlare } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { ChangeMap, ChangeEffects, Info } from './components/ui';


import Loading from './components/Loading';
import { Environment, OrbitControls } from '@react-three/drei'

import { loadHdrTexture } from './components/helpers/loadHdrTexture';
import { FallbackBackground } from './components/FallbackBackground';


export default function App() {
    const [noiseOpacity, setNoiseOpacity] = useState(0.1)
    const [bloomOpacity, setBloomOpacity] = useState(0.1)
    const [brightness, setBrightness] = useState(0)
    const [contrast, setContrast] = useState(0)
    const [maps, setMaps] = useState<any[]>([
        { name: 'Quarry', id: 'quarry', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined },
        { name: 'Metro', id: 'metro', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined },
    ]);
    const [currentMap, setCurrentMap] = useState(maps[0])
    const [mapTexture, setMapTexture] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

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
    
    const changeMap = (name?: string) => {
        let newMap;
        if (name) {
            newMap = maps.find(map => map.name === name);
        } else {
            const currentIndex = maps.findIndex(map => map.name === currentMap.name);
            newMap = maps[(currentIndex + 1) % maps.length];
        }
        setCurrentMap(newMap);
    }

    return (
       <>
            {/* Loading */}
            {isLoading && <Loading />}

            {/* UI */}
            <ChangeMap changeMap={changeMap} maps={maps} />
            <ChangeEffects 
                noiseOpacity={noiseOpacity} 
                setNoiseOpacity={setNoiseOpacity} 
                bloomOpacity={bloomOpacity} 
                setBloomOpacity={setBloomOpacity} 
                brightness={brightness}
                setBrightness={setBrightness}
                contrast={contrast}
                setContrast={setContrast}    
            />
            <Info />
            {!mapTexture && <FallbackBackground />}
            <Suspense fallback={<Loading />}>
                {/* Scene */}
                <Canvas className='cursor-grab active:cursor-grabbing'>
                    <OrbitControls />
                    {mapTexture && <Environment map={mapTexture} background/>}
                    <EffectComposer>
                        <BrightnessContrast brightness={brightness} contrast={contrast} />
                        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.1} height={300} opacity={bloomOpacity} />
                        <Noise blendFunction={currentMap.blendFunction} opacity={noiseOpacity} />
                    </EffectComposer>
                </Canvas>
            </Suspense>

       </>
    );
}
