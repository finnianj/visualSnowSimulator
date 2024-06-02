import React, { createContext, useContext, useState } from 'react';
import { defaultEffectsValues } from './defaultEffectsValues';
import { EffectsContextType } from './types';
import { effectsQueryParamMap } from '../../helpers/utils';

// Create the context with a default dummy state
const EffectsContext = createContext<EffectsContextType | undefined>(undefined);

// Provider component
export const EffectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [modalBeingViewed, setModalBeingViewed] = useState<boolean>(false)
    const [userHasPausedEffects, setUserHasPausedEffects] = useState<boolean>(false)

    const [noiseOpacity, setNoiseOpacity] = useState(defaultEffectsValues.noiseOpacity)
    const [bloomOpacity, setBloomOpacity] = useState(defaultEffectsValues.bloomOpacity)
    
    const [brightness, setBrightness] = useState(defaultEffectsValues.brightness)
    
    const [isFlickering, setIsFlickering] = useState<boolean>(false)
    const [flickerStrength, setFlickerStrength] = useState<number>(defaultEffectsValues.flickerStrength)

    const [dizzinessEnabled, setDizzinessEnabled] = useState<boolean>(defaultEffectsValues.dizzinessEnabled)
    const [dizzinessFrequency, setDizzinessFrequency] = useState<number>(defaultEffectsValues.dizzinessFrequency)
    const [dizzinessAmplitude, setDizzinessAmplitude] = useState<number>(defaultEffectsValues.dizzinessAmplitude)

    const [smallEyeFloatersEnabled, setSmallEyeFloatersEnabled] = useState<boolean>(defaultEffectsValues.smallEyeFloatersEnabled)
    const [smallEyeFloatersCount, setSmallEyeFloatersCount] = useState<number>(defaultEffectsValues.smallEyeFloatersCount)
    const [smallEyeFloatersTransparency, setSmallEyeFloatersTransparency] = useState<number>(defaultEffectsValues.smallEyeFloatersTransparency)
    const [smallEyeFloatersSize, setSmallEyeFloatersSize] = useState<number>(defaultEffectsValues.smallEyeFloatersSize)
    const [smallEyeFloatersColor, setSmallEyeFloatersColor] = useState<number>(defaultEffectsValues.smallEyeFloatersColor)

    const [largeEyeFloatersEnabled, setLargeEyeFloatersEnabled] = useState<boolean>(defaultEffectsValues.largeEyeFloatersEnabled)
    const [largeEyeFloatersCount, setLargeEyeFloatersCount] = useState<number>(defaultEffectsValues.largeEyeFloatersCount)
    const [largeEyeFloatersTransparency, setLargeEyeFloatersTransparency] = useState<number>(defaultEffectsValues.largeEyeFloatersTransparency)
    const [largeEyeFloatersSize, setLargeEyeFloatersSize] = useState<number>(defaultEffectsValues.largeEyeFloatersSize)
    const [largeEyeFloatersColor, setLargeEyeFloatersColor] = useState<number>(defaultEffectsValues.largeEyeFloatersColor)

    const [blurEnabled, setBlurEnabled] = useState<boolean>(defaultEffectsValues.blurEnabled)
    const [blurStrength, setBlurStrength] = useState<number>(defaultEffectsValues.blurStrength)

    const [vignetteStrength, setVignetteStrength] = useState<number>(defaultEffectsValues.vignetteStrength)

    const [showAfterimages, setShowAfterimages] = useState<boolean>(defaultEffectsValues.showAfterimages)

    const resetAllEffectsToDefault = () => {
        // use defaultEffectsValues to reset all values
        setNoiseOpacity(defaultEffectsValues.noiseOpacity)
        setBloomOpacity(defaultEffectsValues.bloomOpacity)
        setBrightness(defaultEffectsValues.brightness)
        setIsFlickering(false)
        setFlickerStrength(defaultEffectsValues.flickerStrength)
        setDizzinessEnabled(defaultEffectsValues.dizzinessEnabled)
        setDizzinessFrequency(defaultEffectsValues.dizzinessFrequency)
        setDizzinessAmplitude(defaultEffectsValues.dizzinessAmplitude)
        setSmallEyeFloatersEnabled(defaultEffectsValues.smallEyeFloatersEnabled)
        setSmallEyeFloatersCount(defaultEffectsValues.smallEyeFloatersCount)
        setSmallEyeFloatersTransparency(defaultEffectsValues.smallEyeFloatersTransparency)
        setSmallEyeFloatersSize(defaultEffectsValues.smallEyeFloatersSize)
        setSmallEyeFloatersColor(defaultEffectsValues.smallEyeFloatersColor)
        setLargeEyeFloatersEnabled(defaultEffectsValues.largeEyeFloatersEnabled)
        setLargeEyeFloatersCount(defaultEffectsValues.largeEyeFloatersCount)
        setLargeEyeFloatersTransparency(defaultEffectsValues.largeEyeFloatersTransparency)
        setLargeEyeFloatersSize(defaultEffectsValues.largeEyeFloatersSize)
        setLargeEyeFloatersColor(defaultEffectsValues.largeEyeFloatersColor)
        setBlurEnabled(defaultEffectsValues.blurEnabled)
        setBlurStrength(defaultEffectsValues.blurStrength)
        setVignetteStrength(defaultEffectsValues.vignetteStrength)
        setShowAfterimages(false)
    }

    const usePreviousConfig = (config: {[key: string]: string}) => {
        // Set values from config object
        for (const key in config) {
            if (effectsQueryParamMap[key as keyof typeof effectsQueryParamMap]) {
                switch (key) {
                    case 'noiseOpacity':
                        setNoiseOpacity(parseFloat(config[key]))
                        break;
                    case 'bloomOpacity':
                        setBloomOpacity(parseFloat(config[key]))
                        break;
                    case 'brightness':
                        setBrightness(parseFloat(config[key]))
                        break;
                    case 'isFlickering':
                        setIsFlickering(config[key] === 'true')
                        break;
                    case 'flickerStrength':
                        setFlickerStrength(parseFloat(config[key]))
                        break;
                    case 'smallEyeFloatersEnabled':
                        setSmallEyeFloatersEnabled(config[key] === 'true')
                        break;
                    case 'largeEyeFloatersEnabled':
                        setLargeEyeFloatersEnabled(config[key] === 'true')
                        break;
                    case 'smallEyeFloatersCount':
                        setSmallEyeFloatersCount(parseInt(config[key]))
                        break;
                    case 'largeEyeFloatersCount':
                        setLargeEyeFloatersCount(parseInt(config[key]))
                        break;
                    case 'smallEyeFloatersSize':
                        setSmallEyeFloatersSize(parseFloat(config[key]))
                        break;
                    case 'largeEyeFloatersSize':
                        setLargeEyeFloatersSize(parseFloat(config[key]))
                        break;
                    case 'smallEyeFloatersTransparency':
                        setSmallEyeFloatersTransparency(parseFloat(config[key]))
                        break;
                    case 'largeEyeFloatersTransparency':
                        setLargeEyeFloatersTransparency(parseFloat(config[key]))
                        break;
                    case 'dizzinessEnabled':
                        setDizzinessEnabled(config[key] === 'true')
                        break;
                    case 'vignetteStrength':
                        setVignetteStrength(parseFloat(config[key]))
                        break;
                    case 'showAfterimages':
                        setShowAfterimages(config[key] === 'true')
                        break;
                    default:
                        break;
                }
            }
        }        
    }

    const value = { 
        modalBeingViewed,
        setModalBeingViewed,
        userHasPausedEffects,
        setUserHasPausedEffects,

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
        dizzinessEnabled,
        setDizzinessEnabled,
        dizzinessFrequency,
        setDizzinessFrequency,
        dizzinessAmplitude,
        setDizzinessAmplitude,
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
        vignetteStrength,
        setVignetteStrength,
        showAfterimages,
        setShowAfterimages,

        resetAllEffectsToDefault,
        usePreviousConfig
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
