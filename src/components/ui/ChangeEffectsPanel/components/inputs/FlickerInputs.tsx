import React, { useState } from 'react';
import { useEffects } from '../../../../context';

import { RangeInput, CheckBoxInput } from '.';

type FlickerInputsProps = {
    hasSeenFlickerWarning: boolean;
    setShowFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlickerInputs = ({ setShowFlickerWarning, hasSeenFlickerWarning }: FlickerInputsProps) => {
    const { isFlickering, setIsFlickering, flickerStrength, setFlickerStrength } = useEffects();

    const handleCheckboxChange = () => {
        if (!isFlickering) {
            if (hasSeenFlickerWarning) {
                setIsFlickering(true);
            } else {
                setShowFlickerWarning(true);
            }
        } else {
            setIsFlickering(!isFlickering);
        }
    }

    return (
        <div>
            <CheckBoxInput
                label='Flickering'
                checked={isFlickering}
                onChange={handleCheckboxChange}
            />
            <RangeInput
                name={'Flicker Strength'}
                min={0}
                max={0.5}
                step={0.01}
                value={flickerStrength}
                onChange={(e) => setFlickerStrength(parseFloat(e.target.value))}
                indent={true}
            />            
        </div>
    )
}