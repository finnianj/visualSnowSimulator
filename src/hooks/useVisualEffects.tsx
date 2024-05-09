import { useState } from 'react'

export const useVisualEffects = () => {
    const [noiseOpacity, setNoiseOpacity] = useState(0.1)
    const [bloomOpacity, setBloomOpacity] = useState(0.1)
    
    const [brightness, setBrightness] = useState(0)
    const [isFlickering, setIsFlickering] = useState<boolean>(false)
    const [flickerStrength, setFlickerStrength] = useState<number>(0)

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
    }
}