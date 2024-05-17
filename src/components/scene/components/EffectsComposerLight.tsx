import { useEffects } from '../../context';

import { EffectComposer, Noise, Bloom, BrightnessContrast, Vignette } from '@react-three/postprocessing';
import { Blur } from '../../customShaders';

import { MapType } from '../../../types';

type EffectsComposerLightProps = {
    currentMap: MapType;
}

{/* Effects composer for performance lighter effects */}

export const EffectsComposerLight = ({ currentMap }: EffectsComposerLightProps) => {
    const {
        disableAllEffects,
        brightness,
        noiseOpacity,
        bloomOpacity,
        vignetteStrength,
    } = useEffects();

    return (
        <EffectComposer enabled={!disableAllEffects}>
            <Blur
                enabled={false} 
                strength={9} 
                />
            <BrightnessContrast brightness={brightness} />
            <Noise blendFunction={currentMap.blendFunction} opacity={noiseOpacity} />
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} height={300} opacity={bloomOpacity} /> 
            <Vignette eskil={false} offset={0.5} darkness={vignetteStrength} />
        </EffectComposer>
    )
}