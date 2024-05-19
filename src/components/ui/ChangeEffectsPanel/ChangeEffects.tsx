import { useEffects } from '../../context'

import { Dropdown } from '../shared/Dropdown'
import { AudioControls } from '../../audio/AudioControls'
import { FlickerInputs, NauseaInputs, RangeInput, EyeFloatersInputs } from './components/inputs'
import { ButtonRow } from './components/buttons/ButtonRow'

type ChangeEffectsProps = {
    setShowFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
    hasSeenFlickerWarning: boolean;
}

export const ChangeEffects = ({ setShowFlickerWarning, hasSeenFlickerWarning }: ChangeEffectsProps) => {
    const { 
        isSimulatorOn,
        noiseOpacity, 
        setNoiseOpacity, 
        bloomOpacity, 
        setBloomOpacity, 
        vignetteStrength,
        setVignetteStrength,
        brightness,
        setBrightness
    } = useEffects();

    return (
        <Dropdown title='Change Effects' childPosition={'origin-top-left top-8 sm:top-12 left-0 space-y-4 p-4 sm:w-96 w-80'} containerPosition='left-4 top-4'>
            <div className={`flex flex-col space-y-2 ${isSimulatorOn ? '' : 'opacity-50 pointer-events-none'}`}>
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
                <RangeInput
                    name={'Brightness'}
                    min={-1}
                    max={1}
                    step={0.01}
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                />

                {/* Flicker */}
                <FlickerInputs 
                    hasSeenFlickerWarning={hasSeenFlickerWarning}
                    setShowFlickerWarning={setShowFlickerWarning}
                />

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
                
            </div>
            <hr></hr>
            <ButtonRow />
        </Dropdown>    
    )
}