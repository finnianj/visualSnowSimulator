import { useEffects } from '../../context'

import { Dropdown } from '../shared/Dropdown'
import { AudioControls } from '../../audio/AudioControls'
import { BrightnessInputs, NauseaInputs, RangeInput, EyeFloatersInputs } from './components/inputs'
import { ButtonRow } from './components/buttons/ButtonRow'

export const ChangeEffects = () => {
    const { 
        noiseOpacity, 
        setNoiseOpacity, 
        bloomOpacity, 
        setBloomOpacity, 
        vignetteStrength,
        setVignetteStrength
    } = useEffects();

    return (
        <Dropdown title='Change Effects' childPosition={'origin-top-left top-8 sm:top-12 left-0 space-y-4 p-4 sm:w-96 w-80'} containerPosition='left-4 top-4'>
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
                <BrightnessInputs />

                {/* Eye Floaters */}
                <EyeFloatersInputs /> 

                {/* Nausea */}
                <NauseaInputs />

                {/* Vignette */}
                <RangeInput
                    name='Vignette'
                    min={0}
                    max={1}
                    step={0.01}
                    value={vignetteStrength}
                    onChange={(e) => setVignetteStrength(parseFloat(e.target.value))}
                />
                    
                <AudioControls />
                
                <ButtonRow />
            </>
        </Dropdown>    
    )
}