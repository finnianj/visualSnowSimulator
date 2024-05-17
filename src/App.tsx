import { Suspense, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise, Bloom, BrightnessContrast, LensFlare, Vignette } from '@react-three/postprocessing'
import { ChangeMap, ChangeEffects, Info, Donate } from './components/ui';



import { OrbitControls } from '@react-three/drei'
import { useVisualEffects, useMaps, useLoading } from './hooks';
import { AudioProvider } from './components/context/AudioContext';
import { AudioPlayer } from './components/audio/AudioPlayer';

import { Vector3 } from 'three';
import EyeFloaters from './customShaders/eyeFloaters/EyeFloaters';
import Nausea from './customShaders/nausea/Nausea';
import { RangeInput } from './components/ui/shared/inputs';
import Blur from './customShaders/blur/Blur';

export default function App() {
    
    const { setIsLoading, LoadingModal } = useLoading();
    
    const { 
        maps, 
        currentMap, 
        changeMap,
        BackgroundComponent,
        FallbackBackgroundComponent
    } = useMaps({ setIsLoading });
    
    const { 
        noiseOpacity, 
        setNoiseOpacity, 
        bloomOpacity, 
        setBloomOpacity, 
        brightness, 
        setBrightness, 
        isFlickering,
        setIsFlickering,
        flickerStrength,
        setFlickerStrength,
        darkMode,
        setDarkMode,
        nauseaFrequency,
        setNauseaFrequency,
        nauseaAmplitude,
        setNauseaAmplitude
    } = useVisualEffects();

    const nauseaRef = useRef();
    const smallEyeFloatersRef = useRef();
    const largeEyeFloatersRef = useRef();
    
    return (
       <>
            {/* Loading */}
            <LoadingModal />
            <AudioProvider>
                {/* Audio */}
                <AudioPlayer />

                {/* UI */}
                <ChangeMap 
                    changeMap={changeMap} 
                    currentMap={currentMap}
                    maps={maps} 
                />
                <ChangeEffects 
                    noiseOpacity={noiseOpacity} 
                    setNoiseOpacity={setNoiseOpacity} 
                    bloomOpacity={bloomOpacity} 
                    setBloomOpacity={setBloomOpacity} 
                    brightness={brightness}
                    setBrightness={setBrightness}
                    isFlickering={isFlickering}
                    setIsFlickering={setIsFlickering}
                    flickerStrength={flickerStrength}
                    setFlickerStrength={setFlickerStrength}
                />
            </AudioProvider>

            <Info
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <Donate />
            <FallbackBackgroundComponent />

            {/* Scene */}
            <Suspense fallback={<LoadingModal />}>
                <Canvas className='cursor-grab active:cursor-grabbing'>
                    <OrbitControls 
                        reverseVerticalOrbit={true}
                        reverseHorizontalOrbit={true}
                    />
                    <BackgroundComponent />
                    <EffectComposer>
                        <Blur
                            enabled={false} 
                            strength={9} 
                        />
                        <EyeFloaters
                            enabled={true}
                            ref={smallEyeFloatersRef}
                            textureUrl={'./textures/noise4.jpeg'}
                            particle_count={10}
                            particle_transparency={0.2}
                            particle_size={0.1}
                            particle_color={0.1}
                        />
                        <EyeFloaters
                            enabled={true}
                            ref={largeEyeFloatersRef}
                            textureUrl={'./textures/noise3.png'}
                            particle_count={3}
                            particle_transparency={0.1}
                            particle_size={0.02}
                            particle_color={0.2}
                        />
                        <Nausea
                            enabled={true}
                            ref={nauseaRef}
                            frequency={nauseaFrequency}
                            amplitude={nauseaAmplitude} 
                        />
                        {/* <BrightnessContrast brightness={brightness} />
                        <Noise blendFunction={currentMap.blendFunction} opacity={noiseOpacity} />
                        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} height={300} opacity={bloomOpacity} /> 
                        <Vignette eskil={false} offset={0.5} darkness={0.7} /> */}
                    </EffectComposer>
                </Canvas>
            </Suspense>
       </>
    );
}
