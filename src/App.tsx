import React, { useEffect, useState, Suspense, startTransition, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Glitch, Noise, Bloom, BrightnessContrast, LensFlare } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
import { ChangeMap, ChangeEffects } from './components/ui';


import Loading from './components/Loading';
import EnvironmentMap from './components/EnvironmentMap';

import { Environment, useEnvironment, OrbitControls } from '@react-three/drei'

export default function App() {
    const [noiseOpacity, setNoiseOpacity] = useState(0.1)
    const [bloomOpacity, setBloomOpacity] = useState(0.1)
    const [brightness, setBrightness] = useState(0)
    const [contrast, setContrast] = useState(0)

    const [loadingMap, setLoadingMap] = useState(true)
    const [mapIndex, setMapIndex] = useState(0)
    const maps = [
        {name: 'Berlin', map: './environmentMaps/hdri/berlin.exr', blendFunction: BlendFunction.SOFT_LIGHT},
        {name: 'Garden', map: './environmentMaps/hdri/garden.exr', blendFunction: BlendFunction.SOFT_LIGHT},
        {name: 'Metro', map: './environmentMaps/hdri/metro.exr', blendFunction: BlendFunction.HARD_LIGHT},
        {name: 'Road', map: './environmentMaps/hdri/road.exr', blendFunction: BlendFunction.SOFT_LIGHT}
    ]

    const changeMap = (name?: string) => {
        setLoadingMap(true)
        if (name) {
            const index = maps.findIndex(map => map.name === name)
            if (index !== -1) {
                console.log('Changing map to:', maps[index].name)
                setMapIndex(index)

                return
            }
        }
        const newIndex = (mapIndex + 1) % maps.length
        console.log('Changing map to:', maps[newIndex].name)
        setMapIndex(newIndex)
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

            <Suspense fallback={<Loading />}>
                {/* Scene */}
                <Canvas>
                    <OrbitControls />
                        <EnvironmentMap maps={maps} mapIndex={mapIndex} setLoadingMap={setLoadingMap} />
                        <EffectComposer>
                            <BrightnessContrast brightness={brightness} contrast={contrast} />
                            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={bloomOpacity} />
                            <Noise blendFunction={maps[mapIndex].blendFunction} opacity={noiseOpacity} />
                
                        </EffectComposer>
                </Canvas>
            </Suspense>

       </>
    );
}
