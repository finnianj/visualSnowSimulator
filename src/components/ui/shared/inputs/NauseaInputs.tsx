import { useEffects } from '../../../context';

import { RangeInput, CheckBoxInput } from '.';

export const NauseaInputs = () => {
    const { 
        nauseaEnabled, 
        setNauseaEnabled, 
        nauseaAmplitude, 
        setNauseaAmplitude, 
        nauseaFrequency, 
        setNauseaFrequency 
    } = useEffects()


    return (
        <div>
            <CheckBoxInput
                label='Nausea'
                checked={nauseaEnabled}
                onChange={() => setNauseaEnabled(!nauseaEnabled)}
            />
            {/* <RangeInput
                name={'Nausea Amplitude'}
                min={-1}
                max={1}
                step={0.01}
                value={nauseaAmplitude}
                onChange={(e) => setNauseaAmplitude(parseFloat(e.target.value))}
            />
            <RangeInput
                name={'Nausea Frequency'}
                min={0.01}
                max={0.1}
                step={0.001}
                value={nauseaFrequency}
                onChange={(e) => setNauseaFrequency(parseFloat(e.target.value))}
            /> */}
        </div>
    )
}