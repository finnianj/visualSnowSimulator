import React, { useEffect, useState } from 'react'
import { RangeInput } from './shared/inputs/RangeInput'
import { Dropdown } from './shared/Dropdown'
import { AudioControls } from '../audio/AudioControls'
import { CheckBoxInput } from './shared/inputs/CheckboxInput'
import { Brightness } from './effects/Brightness/Brightness'
import { is } from '@react-three/fiber/dist/declarations/src/core/utils'

type ChangeEffectsProps = {
    noiseOpacity: number,
    setNoiseOpacity: (value: number) => void,
    bloomOpacity: number,
    setBloomOpacity: (value: number) => void,
    brightness: number,
    setBrightness: (value: number) => void,
    isFlickering: boolean,
    setIsFlickering: (value: boolean) => void,
    flickerStrength: number,
    setFlickerStrength: (value: number) => void,
}

export const ChangeEffects = ({
    noiseOpacity,
    setNoiseOpacity, 
    bloomOpacity,
    setBloomOpacity,
    brightness,
    setBrightness,
    isFlickering,
    setIsFlickering,
    flickerStrength,
    setFlickerStrength
}: ChangeEffectsProps) => {


    return (
        <Dropdown title='Change Effects' childPosition={'origin-top-left top-12 left-0 space-y-4 p-4 !w-96'} containerPosition='left-4 top-4'>
            <>
                {/* Snow opacity */}
                <RangeInput 
                    name='Snow' 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    value={noiseOpacity} 
                    onChange={(e) => setNoiseOpacity(parseFloat(e.target.value))}
                />
                
                {/* Bloom opacity */}
                <RangeInput
                    name='Bloom'
                    min={0}
                    max={10}
                    step={0.01}
                    value={bloomOpacity}
                    onChange={(e) => setBloomOpacity(parseFloat(e.target.value))}
                />
                

                {/* Brightness */}
                <Brightness 
                    brightness={brightness} 
                    setBrightness={setBrightness} 
                    isFlickering={isFlickering}
                    setIsFlickering={setIsFlickering}
                    flickerStrength={flickerStrength}
                    setFlickerStrength={setFlickerStrength}
                />
                

                {/* Contrast */}
                {/* <RangeInput
                    name='Contrast'
                    min={-1}
                    max={1}
                    step={0.01}
                    value={contrast}
                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                /> */}

                <AudioControls />
            </>
        </Dropdown>    
    )
}