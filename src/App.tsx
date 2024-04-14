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

    const [loadingMap, setLoadingMap] = useState(false)
    const [mapIndex, setMapIndex] = useState(0)

    const berlin = useEnvironment({ files: './environmentMaps/hdri/berlin.exr' });
    const garden = useEnvironment({ files: './environmentMaps/hdri/garden.exr' });
    const metro = useEnvironment({ files: './environmentMaps/hdri/metro.exr' });
    const road = useEnvironment({ files: './environmentMaps/hdri/road.exr' });
    
    const maps = [
        {name: 'Berlin', map: berlin, bestSnowType: 'SOFT_LIGHT'},
        {name: 'Garden', map: garden, bestSnowType: 'HARD_LIGHT'},
        {name: 'Metro', map: metro, bestSnowType: 'HARD_LIGHT'},
        {name: 'Road', map: road, bestSnowType: 'SOFT_LIGHT'}
    ]

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



    return (
       <>
            {loadingMap && <Loading />}

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
                <EffectComposer>
                    <Environment
                        background
                        map={maps[mapIndex].map}
                    />
                    <BrightnessContrast brightness={brightness} contrast={contrast} />
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={bloomOpacity} />
                    <Noise blendFunction={maps[mapIndex].bestSnowType === 'SOFT_LIGHT' ? BlendFunction.SOFT_LIGHT : BlendFunction.HARD_LIGHT} opacity={noiseOpacity} />
        
                </EffectComposer>
                </Suspense>
            </Canvas>

       </>
    );
}
