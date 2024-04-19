import React, { useEffect, useState, Suspense, startTransition, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Glitch, Noise, Bloom, BrightnessContrast, LensFlare } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
import { ChangeMap, ChangeEffects } from './components/ui';


import Loading from './components/Loading';
import EnvironmentMap from './components/EnvironmentMap';

import { Environment, useEnvironment, OrbitControls } from '@react-three/drei'
import { loadExrTexture } from './components/helpers/loadExrTexture';

import { Texture } from 'three';

export default function App() {
    const [noiseOpacity, setNoiseOpacity] = useState(0.1)
    const [bloomOpacity, setBloomOpacity] = useState(0.1)
    const [brightness, setBrightness] = useState(0)
    const [contrast, setContrast] = useState(0)

    const [loadingMap, setLoadingMap] = useState(true)
    const [mapTexture, setMapTexture] = useState<Texture | undefined>(undefined);
    const [mapIndex, setMapIndex] = useState(0)
    const [maps, setMaps] = useState<any[]>([
        {name: 'Berlin', map: './environmentMaps/hdri/berlin.exr', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined},
        {name: 'Garden', map: './environmentMaps/hdri/garden.exr', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined},
        {name: 'Metro', map: './environmentMaps/hdri/metro.exr', blendFunction: BlendFunction.HARD_LIGHT, texture: undefined},
        {name: 'Road', map: './environmentMaps/hdri/road.exr', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined}
    ]);

    useEffect(() => {
        const loadMap = async () => {
            setLoadingMap(true)
            const map = maps[mapIndex];
            if (map.texture) {
                console.log('Map already loaded:', map.texture);
                setMapTexture(map.texture);
                setLoadingMap(false)
                return
            }
            console.log('Loading map:', map.map);
            const texture = await loadExrTexture(map.map);
            setMapTexture(texture);
            setMaps(maps.map((m, i) => {
                if (i === mapIndex) {
                    return {...m, texture}
                }
                return m
            }));
            console.log('Map loaded:', texture);
            setLoadingMap(false)
        }
        startTransition(() => {
            loadMap();
        });
    }, [mapIndex]);

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
            {/* Loading */}
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

            <Suspense fallback={<Loading />}>
                {/* Scene */}
                <Canvas>
                    <OrbitControls />
                    {mapTexture && <Environment map={mapTexture} background />}
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
