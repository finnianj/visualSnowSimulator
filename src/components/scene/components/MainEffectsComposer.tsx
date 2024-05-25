import React, { useRef } from 'react';
import { useEffects, useLoading } from '@/components/context';

import { EffectComposer, Noise, Bloom, BrightnessContrast, Vignette } from '@react-three/postprocessing';
import { Blur, Flicker, EyeFloaters, Afterimages, Dizziness } from '@/components/customShaders';

import { MapType } from '@/components/types';

type EffectsComposerLightProps = {
    currentMap: MapType;
}

{/* Effects composer for performance lighter effects */}

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
        blurEnabled,
        blurStrength,

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
    } = useEffects();

    const { isLoading } = useLoading();

    const dizzinessRef = useRef();
    const smallEyeFloatersRef = useRef();
    const largeEyeFloatersRef = useRef();

    // return (
    //     <EffectComposer>
    //         {/* Afterimages */}
    //         <Afterimages enabled={true} />
    //     </EffectComposer>
    // )

    return (
            <EffectComposer enabled={!isLoading && !userHasPausedEffects && !modalBeingViewed} >        
                {/* <Blur
                    enabled={blurEnabled} 
                    strength={blurStrength} 
                />     */}
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