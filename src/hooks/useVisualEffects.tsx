import { useState } from 'react'

export const useVisualEffects = () => {
    const [noiseOpacity, setNoiseOpacity] = useState(0.5)
    const [bloomOpacity, setBloomOpacity] = useState(0.1)
    
    const [brightness, setBrightness] = useState(0)
    const [isFlickering, setIsFlickering] = useState<boolean>(false)
    const [flickerStrength, setFlickerStrength] = useState<number>(0)

    const [nauseaFrequency, setNauseaFrequency] = useState<number>(2)
    const [nauseaAmplitude, setNauseaAmplitude] = useState<number>(0.1)

    const [darkMode, setDarkMode] = useState<boolean>(false)

    return {
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
    }
}