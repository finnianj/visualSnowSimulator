import { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise, Bloom, BrightnessContrast, LensFlare } from '@react-three/postprocessing'
import { ChangeMap, ChangeEffects, Info, Donate } from './components/ui';

import { OrbitControls } from '@react-three/drei'
import { useVisualEffects, useMaps, useLoading } from './hooks';
import { AudioProvider } from './components/context/AudioContext';
import { AudioPlayer } from './components/audio/AudioPlayer';

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
        setDarkMode
    } = useVisualEffects();
    
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
                    <OrbitControls />
                    <BackgroundComponent />
                    <EffectComposer>
                        <BrightnessContrast brightness={brightness} />
                        <Noise blendFunction={currentMap.blendFunction} opacity={noiseOpacity} />
                        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} height={300} opacity={bloomOpacity} />
                    </EffectComposer>
                </Canvas>
            </Suspense>
       </>
    );
}
