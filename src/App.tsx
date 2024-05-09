import React, { useEffect, useState, Suspense, startTransition, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Noise, Bloom, BrightnessContrast, LensFlare } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { ChangeMap, ChangeEffects, Info } from './components/ui';


import Loading from './components/Loading';
import { Environment, OrbitControls } from '@react-three/drei'

import { FallbackBackground } from './components/FallbackBackground';
import { useVisualEffects, useMaps, useLoading } from './hooks';

export default function App() {
    
    const { isLoading, setIsLoading, Loading } = useLoading();
    
    const { 
        maps, 
        currentMap, 
        mapTexture,
        changeMap
    } = useMaps({ setIsLoading });
    
    const { 
        noiseOpacity, 
        setNoiseOpacity, 
        bloomOpacity, 
        setBloomOpacity, 
        brightness, 
        setBrightness, 
        contrast, 
        setContrast 
    } = useVisualEffects();
    

    return (
       <>
            {/* Loading */}
            {isLoading && <Loading />}

            {/* UI */}
            <ChangeMap 
                changeMap={changeMap} 
                maps={maps} 
            />
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

            {/* Scene */}
            <Suspense fallback={<Loading />}>
                <Canvas className='cursor-grab active:cursor-grabbing'>
                    <OrbitControls />
                    {mapTexture && <Environment map={mapTexture} background/>}
                    <EffectComposer>
                        <BrightnessContrast brightness={brightness} contrast={contrast} />
                        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} height={300} opacity={bloomOpacity} />
                        <Noise blendFunction={currentMap.blendFunction} opacity={noiseOpacity} />
                    </EffectComposer>
                </Canvas>
            </Suspense>
       </>
    );
}
