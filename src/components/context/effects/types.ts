// Define the type for the context state
export type EffectsContextType = {
    disableAllEffects: boolean;
    setDisableAllEffects: (value: boolean) => void;
    noiseOpacity: number;
    setNoiseOpacity: (value: number) => void;
    bloomOpacity: number;
    setBloomOpacity: (value: number) => void;
    brightness: number;
    setBrightness: (value: number) => void;
    isFlickering: boolean;
    setIsFlickering: (value: boolean) => void;
    flickerStrength: number;
    setFlickerStrength: (value: number) => void;
    nauseaEnabled: boolean;
    setNauseaEnabled: (value: boolean) => void;
    nauseaFrequency: number;
    setNauseaFrequency: (value: number) => void;
    nauseaAmplitude: number;
    setNauseaAmplitude: (value: number) => void;
    smallEyeFloatersEnabled: boolean;
    setSmallEyeFloatersEnabled: (value: boolean) => void;
    smallEyeFloatersCount: number;
    setSmallEyeFloatersCount: (value: number) => void;
    smallEyeFloatersTransparency: number;
    setSmallEyeFloatersTransparency: (value: number) => void;
    smallEyeFloatersSize: number;
    setSmallEyeFloatersSize: (value: number) => void;
    smallEyeFloatersColor: number;
    setSmallEyeFloatersColor: (value: number) => void;
    largeEyeFloatersEnabled: boolean;
    setLargeEyeFloatersEnabled: (value: boolean) => void;
    largeEyeFloatersCount: number;
    setLargeEyeFloatersCount: (value: number) => void;
    largeEyeFloatersTransparency: number;
    setLargeEyeFloatersTransparency: (value: number) => void;
    largeEyeFloatersSize: number;
    setLargeEyeFloatersSize: (value: number) => void;
    largeEyeFloatersColor: number;
    setLargeEyeFloatersColor: (value: number) => void;
    blurEnabled: boolean;
    setBlurEnabled: (value: boolean) => void;
    blurStrength: number;
    setBlurStrength: (value: number) => void;
    vignetteStrength: number;
    setVignetteStrength: (value: number) => void;

    resetAllEffectsToDefault: () => void;
    usePreviousConfig: (config: {[key: string]: string}) => void;
};

export type DefaultEffectsValuesType = {
    noiseOpacity: number;
    bloomOpacity: number;
    brightness: number;
    isFlickering: boolean;
    flickerStrength: number;
    nauseaEnabled: boolean;
    nauseaFrequency: number;
    nauseaAmplitude: number;
    smallEyeFloatersEnabled: boolean;
    smallEyeFloatersCount: number;
    smallEyeFloatersTransparency: number;
    smallEyeFloatersSize: number;
    smallEyeFloatersColor: number;
    largeEyeFloatersEnabled: boolean;
    largeEyeFloatersCount: number;
    largeEyeFloatersTransparency: number;
    largeEyeFloatersSize: number;
    largeEyeFloatersColor: number;
    blurEnabled: boolean;
    blurStrength: number;
    vignetteStrength: number;
};
