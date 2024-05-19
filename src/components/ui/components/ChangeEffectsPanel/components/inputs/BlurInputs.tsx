import React, { useState } from 'react';
import { useEffects, useUI } from '../../../../../context';

import { RangeInput, CheckBoxInput } from '.';

export const BlurInputs = () => {
    const { blurEnabled, setBlurEnabled, blurStrength, setBlurStrength } = useEffects();

    return (
        <div>
            <CheckBoxInput
                label='Blur'
                checked={blurEnabled}
                onChange={(e) => setBlurEnabled(e.target.checked)}
            />
            <RangeInput
                name={'Blur Strength'}
                min={0.1}
                max={10}
                step={1}
                value={blurStrength}
                onChange={(e) => setBlurStrength(parseFloat(e.target.value))}
                indent={true}
            />            
        </div>
    )
}