import { RangeInput } from './RangeInput'
import { Dropdown } from './Dropdown'
import { AudioControls } from './AudioControls'

type ChangeEffectsProps = {
    noiseOpacity: number,
    setNoiseOpacity: (value: number) => void,
    bloomOpacity: number,
    setBloomOpacity: (value: number) => void,
    brightness: number,
    setBrightness: (value: number) => void,
    contrast: number,
    setContrast: (value: number) => void,
}

export const ChangeEffects = ({
    noiseOpacity,
    setNoiseOpacity, 
    bloomOpacity,
    setBloomOpacity,
    brightness,
    setBrightness,
    contrast,
    setContrast,
}: ChangeEffectsProps) => {

    return (
        <Dropdown title='Change Effects' side='top-left' classes={'space-y-4 p-4'}>
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
                <RangeInput
                    name='Brightness'
                    min={-1}
                    max={1}
                    step={0.01}
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                />

                {/* Contrast */}
                <RangeInput
                    name='Contrast'
                    min={-1}
                    max={1}
                    step={0.01}
                    value={contrast}
                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                />

                <AudioControls />
            </>
        </Dropdown>    
    )
}