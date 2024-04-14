import React, { useEffect, useState, Suspense, startTransition, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Glitch, Noise, Bloom, BrightnessContrast, LensFlare } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
import { ChangeMap, ChangeEffects } from './components/ui';


import Loading from './components/Loading';

import { Environment, useEnvironment, OrbitControls } from '@react-three/drei'

export default function App() {
    const [noiseOpacity, setNoiseOpacity] = useState(0.1)
    const [bloomOpacity, setBloomOpacity] = useState(0.1)
    const [brightness, setBrightness] = useState(0)
    const [contrast, setContrast] = useState(0)

    const [loadingMap, setLoadingMap] = useState(true)
    const [mapIndex, setMapIndex] = useState(0)
    
    // Load maps
    const berlin = useEnvironment({ files: './environmentMaps/hdri/berlin.exr' });
    const garden = useEnvironment({ files: './environmentMaps/hdri/garden.exr' });
    const metro = useEnvironment({ files: './environmentMaps/hdri/metro.exr' });
    const road = useEnvironment({ files: './environmentMaps/hdri/road.exr' })
    
    const maps = [
        {name: 'Berlin', map: berlin, blendFunction: BlendFunction.SOFT_LIGHT},
        {name: 'Garden', map: garden, blendFunction: BlendFunction.SOFT_LIGHT},
        {name: 'Metro', map: metro, blendFunction: BlendFunction.HARD_LIGHT},
        {name: 'Road', map: road, blendFunction: BlendFunction.SOFT_LIGHT}
    ]
    
    useEffect(() => {
        if (maps.every(map => map.map)) {
            console.log('Maps loaded')
            setLoadingMap(false)
        } else {
            console.log('Maps loading')
            setLoadingMap(true)
        }
    }, [maps])

    const changeMap = (name?: string) => {
        setLoadingMap(true)
        if (name) {
            const index = maps.findIndex(map => map.name === name)
            if (index !== -1) {
                console.log('Changing map to:', maps[index].name)
                setMapIndex(index)
                setLoadingMap(false)
                return
            }
        }
        const newIndex = (mapIndex + 1) % maps.length
        console.log('Changing map to:', maps[newIndex].name)
        setMapIndex(newIndex)
        setLoadingMap(false)
    }

    if (loadingMap) {
        return <Loading />
    }

    return (
       <>
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

            {/* Scene */}
            <Canvas>
                <OrbitControls />
                <Suspense fallback={<p>Loading...</p>}>
                        <Environment
                            background
                            map={maps[mapIndex].map}
                        />
                </Suspense>
                    <EffectComposer>
                        <BrightnessContrast brightness={brightness} contrast={contrast} />
                        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={bloomOpacity} />
                        <Noise blendFunction={maps[mapIndex].blendFunction} opacity={noiseOpacity} />
            
                    </EffectComposer>
            </Canvas>

       </>
    );
}
