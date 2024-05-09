import React, { useState, useEffect } from 'react';
import { RangeInput, CheckBoxInput } from '../../shared/inputs';

type BrightnessProps = {
    brightness: number;
    setBrightness: (value: number) => void;
}

export const Brightness = ({brightness, setBrightness}: BrightnessProps) => {
    const [isFlickering, setIsFlickering] = useState<boolean>(false)
    const [flickerInterval, setFlickerInterval] = useState<number>(0)
    const [flickerStrength, setFlickerStrength] = useState<number>(0)

    // If isFlickering is true, randomly modulate the brightness by 0.01 every 100ms
    useEffect(() => {
        if (isFlickering) {
            const interval = setInterval(() => {
                const newBrightness = brightness + (Math.random() * flickerStrength)
                setBrightness(newBrightness)
            }, flickerInterval)
            return () => clearInterval(interval)
        }
    }, [isFlickering, flickerInterval, flickerStrength])

    return (
        <div>
            <RangeInput
                name={'Brightness'}
                min={-1}
                max={1}
                step={0.01}
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
            />
            <CheckBoxInput
                label='Flickering - (Auto modulate brightness)'
                checked={isFlickering}
                onChange={() => setIsFlickering(!isFlickering)}
            />
            <RangeInput
                name={'Flicker Strength'}
                min={0.01}
                max={0.1}
                step={0.001}
                value={flickerStrength}
                onChange={(e) => setFlickerStrength(parseFloat(e.target.value))}
            />
            <RangeInput
                name={'Flicker Interval'}
                min={10}
                max={1000}
                step={10}
                value={flickerInterval}
                onChange={(e) => setFlickerInterval(parseFloat(e.target.value))}
            />
        </div>
    )
}