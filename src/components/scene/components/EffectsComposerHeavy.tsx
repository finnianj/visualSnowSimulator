import { useRef } from 'react';

import { useEffects } from '../../context';

import { EffectComposer } from '@react-three/postprocessing';
import { EyeFloaters, Nausea } from '../../customShaders';

import { MapType } from '../../../types';

type EffectsComposerHeavyProps = {
    currentMap: MapType;
}

{/* Separate Effects composer for nausea and eye floaters because they are performance heavy */}

export const EffectsComposerHeavy = ({ currentMap }: EffectsComposerHeavyProps) => {
    const {
        disableAllEffects,

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
        <EffectComposer enabled={!disableAllEffects && (nauseaEnabled || smallEyeFloatersEnabled || largeEyeFloatersEnabled) }>
            {/* Small Eye Floaters */}
            <EyeFloaters
                enabled={true}
                ref={smallEyeFloatersRef}
                textureUrl={'./textures/noise4.jpeg'}
                particle_count={smallEyeFloatersCount}
                particle_transparency={smallEyeFloatersTransparency}
                particle_size={smallEyeFloatersSize}
                particle_color={smallEyeFloatersColor}
                />
            
            {/* Large Eye Floaters */}
            <EyeFloaters
                enabled={true}
                ref={largeEyeFloatersRef}
                textureUrl={'./textures/noise3.png'}
                particle_count={largeEyeFloatersCount}
                particle_transparency={largeEyeFloatersTransparency}
                particle_size={largeEyeFloatersSize}
                particle_color={largeEyeFloatersColor}
                />
            
            {/* Nausea */}
            <Nausea
                enabled={false}
                ref={nauseaRef}
                frequency={nauseaFrequency}
                amplitude={nauseaAmplitude} 
            />
        </EffectComposer>
    )
}