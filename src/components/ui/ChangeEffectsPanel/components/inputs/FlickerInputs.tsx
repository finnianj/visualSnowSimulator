import React, { useState } from 'react';
import { useEffects, useUI } from '../../../../context';

import { RangeInput, CheckBoxInput } from '.';

export const FlickerInputs = () => {
    const { isFlickering, setIsFlickering, flickerStrength, setFlickerStrength } = useEffects();
    const { setShowFlickerWarning, hasSeenFlickerWarning } = useUI();

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
                max={0.3}
                step={0.01}
                value={flickerStrength}
                onChange={(e) => setFlickerStrength(parseFloat(e.target.value))}
                indent={true}
            />            
        </div>
    )
}