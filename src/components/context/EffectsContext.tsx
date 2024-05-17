import React, { createContext, useContext, useState } from 'react';

// Define the type for the context state
type EffectsContextType = {
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
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
};

// Create the context with a default dummy state
const EffectsContext = createContext<EffectsContextType | undefined>(undefined);

// Provider component
export const EffectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [disableAllEffects, setDisableAllEffects] = useState<boolean>(false)

    const [noiseOpacity, setNoiseOpacity] = useState(0.5)
    const [bloomOpacity, setBloomOpacity] = useState(0.1)
    
    const [brightness, setBrightness] = useState(0)
    const [isFlickering, setIsFlickering] = useState<boolean>(false)
    const [flickerStrength, setFlickerStrength] = useState<number>(0)

    const [nauseaEnabled, setNauseaEnabled] = useState<boolean>(false)
    const [nauseaFrequency, setNauseaFrequency] = useState<number>(2)
    const [nauseaAmplitude, setNauseaAmplitude] = useState<number>(0.1)

    const [smallEyeFloatersEnabled, setSmallEyeFloatersEnabled] = useState<boolean>(false)
    const [smallEyeFloatersCount, setSmallEyeFloatersCount] = useState<number>(10)
    const [smallEyeFloatersTransparency, setSmallEyeFloatersTransparency] = useState<number>(0.2)
    const [smallEyeFloatersSize, setSmallEyeFloatersSize] = useState<number>(0.1)
    const [smallEyeFloatersColor, setSmallEyeFloatersColor] = useState<number>(0.1)

    const [largeEyeFloatersEnabled, setLargeEyeFloatersEnabled] = useState<boolean>(false)
    const [largeEyeFloatersCount, setLargeEyeFloatersCount] = useState<number>(3)
    const [largeEyeFloatersTransparency, setLargeEyeFloatersTransparency] = useState<number>(0.1)
    const [largeEyeFloatersSize, setLargeEyeFloatersSize] = useState<number>(0.02)
    const [largeEyeFloatersColor, setLargeEyeFloatersColor] = useState<number>(0.2)

    const [blurEnabled, setBlurEnabled] = useState<boolean>(false)
    const [blurStrength, setBlurStrength] = useState<number>(5)

    const [darkMode, setDarkMode] = useState<boolean>(false)

    const value = { 
        disableAllEffects,
        setDisableAllEffects,
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
        nauseaEnabled,
        setNauseaEnabled,
        nauseaFrequency,
        setNauseaFrequency,
        nauseaAmplitude,
        setNauseaAmplitude,
        smallEyeFloatersEnabled,
        setSmallEyeFloatersEnabled,
        smallEyeFloatersCount,
        setSmallEyeFloatersCount,
        smallEyeFloatersTransparency,
        setSmallEyeFloatersTransparency,
        smallEyeFloatersSize,
        setSmallEyeFloatersSize,
        smallEyeFloatersColor,
        setSmallEyeFloatersColor,
        largeEyeFloatersEnabled,
        setLargeEyeFloatersEnabled,
        largeEyeFloatersCount,
        setLargeEyeFloatersCount,
        largeEyeFloatersTransparency,
        setLargeEyeFloatersTransparency,
        largeEyeFloatersSize,
        setLargeEyeFloatersSize,
        largeEyeFloatersColor,
        setLargeEyeFloatersColor,
        blurEnabled,
        setBlurEnabled,
        blurStrength,
        setBlurStrength,
        darkMode,
        setDarkMode
    };

    return (
        <EffectsContext.Provider value={value}>
            {children}
        </EffectsContext.Provider>
    );
};

// Hook to use the Effects context
export const useEffects = () => {
    const context = useContext(EffectsContext);
    if (!context) {
        throw new Error('useEffects must be used within an EffectsProvider');
    }
    return context;
};
