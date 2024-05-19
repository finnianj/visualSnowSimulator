import { useEffects } from '../../../../context';

import { RangeInput, CheckBoxInput } from '.';

export const FlickerInputs = () => {
    const { isFlickering, setIsFlickering, flickerStrength, setFlickerStrength } = useEffects();

    return (
        <div>
            <CheckBoxInput
                label='Flickering'
                checked={isFlickering}
                onChange={() => setIsFlickering(!isFlickering)}
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