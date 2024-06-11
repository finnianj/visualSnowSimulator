import { useEffect, useRef, useState } from 'react';
import { useEffects, useLoading } from '@/components/context';
import { EffectComposer, Noise, Bloom, BrightnessContrast, Vignette } from '@react-three/postprocessing';
import { Flicker, EyeFloaters, Dizziness } from '@/components/customShaders';

import { MapType } from '@/components/types';
import { Afterimage } from '@/components/customShaders/afterimage/Afterimage';
import { Snow } from '@/components/customShaders/snow/Snow';

type EffectsComposerLightProps = {
    currentMap: MapType;
}

export const MainEffectsComposer = ({ currentMap }: EffectsComposerLightProps) => {

    const {
        modalBeingViewed,
        userHasPausedEffects,
        brightness,
        noiseOpacity,
        bloomOpacity,
        vignetteStrength,
        isFlickering,
        flickerStrength,
        dizzinessEnabled,
        dizzinessFrequency,
        dizzinessAmplitude,

        smallEyeFloatersEnabled,
        smallEyeFloatersCount,
        smallEyeFloatersTransparency,
        smallEyeFloatersSize,
        smallEyeFloatersColor,

        largeEyeFloatersEnabled,
        largeEyeFloatersCount,
        largeEyeFloatersTransparency,
        largeEyeFloatersSize,
        largeEyeFloatersColor,

        showAfterimages
    } = useEffects();

    const { isLoading } = useLoading();

    const dizzinessRef = useRef();
    const smallEyeFloatersRef = useRef();
    const largeEyeFloatersRef = useRef();

    const [key, setKey] = useState(0);

    useEffect(() => {
        // For some reason, the noise effect keeps bugging out. By re rendering the composer when something changes, it fixes the issue
        setKey(key + 1);
    }, 
    [   
        isLoading,
        userHasPausedEffects,
        modalBeingViewed,
        brightness,
        noiseOpacity,
        bloomOpacity,
        vignetteStrength,
        isFlickering,
        flickerStrength,
        dizzinessEnabled,
        dizzinessFrequency,
        dizzinessAmplitude,

        smallEyeFloatersEnabled,
        smallEyeFloatersCount,
        smallEyeFloatersTransparency,
        smallEyeFloatersSize,
        smallEyeFloatersColor,

        largeEyeFloatersEnabled,
        largeEyeFloatersCount,
        largeEyeFloatersTransparency,
        largeEyeFloatersSize,
        largeEyeFloatersColor,

        showAfterimages
    ])
    
    return (
        <EffectComposer enabled={!isLoading && !userHasPausedEffects && !modalBeingViewed} key={key}>     
            <Afterimage enabled={showAfterimages} damp={currentMap.afterimageStrength} />

            <Flicker enabled={isFlickering} textureUrl='./textures/noise4.jpeg' intensity={flickerStrength} />
            <BrightnessContrast brightness={brightness} />

            {/* Small Eye Floaters */}
            <EyeFloaters
                enabled={smallEyeFloatersEnabled}
                ref={smallEyeFloatersRef}
                textureUrl={'./textures/noise4.jpeg'}
                particle_count={smallEyeFloatersCount}
                particle_transparency={smallEyeFloatersTransparency}
                particle_size={smallEyeFloatersSize}
                particle_color={smallEyeFloatersColor}
                />
            
            {/* Large Eye Floaters */}
            <EyeFloaters
                enabled={largeEyeFloatersEnabled}
                ref={largeEyeFloatersRef}
                textureUrl={'./textures/noise3.png'}
                particle_count={largeEyeFloatersCount}
                particle_transparency={largeEyeFloatersTransparency}
                particle_size={largeEyeFloatersSize}
                particle_color={largeEyeFloatersColor}
            />
            

            {/* Dizziness */}
            <Dizziness
                enabled={dizzinessEnabled}
                ref={dizzinessRef}
                frequency={dizzinessFrequency}
                amplitude={dizzinessAmplitude} 
            />

            <Vignette eskil={false} offset={0.5} darkness={vignetteStrength} />
            <Noise blendFunction={currentMap.blendFunction} opacity={noiseOpacity} />
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} height={300} opacity={bloomOpacity} /> 
            
        </EffectComposer>       
    )
}