import { useEffects } from '../../../../../context';

import { RangeInput, CheckBoxInput } from '.';

export const DizzinessInputs = () => {
    const { 
        dizzinessEnabled, 
        setDizzinessEnabled, 
        dizzinessAmplitude, 
        setDizzinessAmplitude, 
        dizzinessFrequency, 
        setDizzinessFrequency 
    } = useEffects()


    return (
        <div>
            <CheckBoxInput
                label='Dizziness'
                checked={dizzinessEnabled}
                onChange={() => setDizzinessEnabled(!dizzinessEnabled)}
            />
            {/* <RangeInput
                name={'Dizziness Amplitude'}
                min={-1}
                max={1}
                step={0.01}
                value={dizzinessAmplitude}
                onChange={(e) => setDizzinessAmplitude(parseFloat(e.target.value))}
            />
            <RangeInput
                name={'Dizziness Frequency'}
                min={0.01}
                max={0.1}
                step={0.001}
                value={dizzinessFrequency}
                onChange={(e) => setDizzinessFrequency(parseFloat(e.target.value))}
            /> */}
        </div>
    )
}