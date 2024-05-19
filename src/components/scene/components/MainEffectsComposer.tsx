import React, { useRef } from 'react';
import { useEffects } from '../../context';

import { EffectComposer, Noise, Bloom, BrightnessContrast, Vignette } from '@react-three/postprocessing';
import { Blur, Flicker, EyeFloaters, Nausea } from '../../customShaders';

import { MapType } from '../../../types';

type EffectsComposerLightProps = {
    currentMap: MapType;
}

{/* Effects composer for performance lighter effects */}

export const MainEffectsComposer = ({ currentMap }: EffectsComposerLightProps) => {
    const {
        isSimulatorOn,
        disableAllEffects,
        brightness,
        noiseOpacity,
        bloomOpacity,
        vignetteStrength,
        isFlickering,
        flickerStrength,
        nauseaEnabled,
        nauseaFrequency,
        nauseaAmplitude,

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

    const nauseaRef = useRef();
    const smallEyeFloatersRef = useRef();
    const largeEyeFloatersRef = useRef();

    return (
            <EffectComposer enabled={!disableAllEffects && isSimulatorOn}  >            
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

                
                {/* Nausea */}
                <Nausea
                    enabled={nauseaEnabled}
                    ref={nauseaRef}
                    frequency={nauseaFrequency}
                    amplitude={nauseaAmplitude} 
                />

                <Blur
                    enabled={false} 
                    strength={9} 
                />
                <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} height={300} opacity={bloomOpacity} /> 
                <Vignette eskil={false} offset={0.5} darkness={vignetteStrength} />
                <Noise blendFunction={currentMap.blendFunction} opacity={noiseOpacity} />
                
            </EffectComposer>   
    )
}