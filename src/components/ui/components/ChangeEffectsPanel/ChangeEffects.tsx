import React, { useState } from 'react'

import { useEffects } from '@/components/context'

import { useTranslation } from 'react-i18next'

import { Dropdown } from '@/ui/shared/Dropdown'
import { AudioControls } from '@/components/audio/AudioControls'
import { FlickerInputs, DizzinessInputs, RangeInput, EyeFloatersInputs, CheckBoxInput } from '@/ui/components/ChangeEffectsPanel/components/inputs'
import { ButtonRow } from '@/ui/components/ChangeEffectsPanel/components/buttons/ButtonRow'
import { BlurInputs } from '@/ui/components/ChangeEffectsPanel/components/inputs/BlurInputs'
import { AfterimagesInputs } from './components/inputs/AfterimagesInputs'

export const ChangeEffects = () => {
    const [showList, setShowList] = useState(false)
    const { t } = useTranslation(['translation'])

    const { 
        userHasPausedEffects,
        noiseOpacity, 
        setNoiseOpacity, 
        bloomOpacity, 
        setBloomOpacity, 
        vignetteStrength,
        setVignetteStrength,
        brightness,
        setBrightness,
        showAfterimages,
        setShowAfterimages,
        // blurEnabled,
        // setBlurEnabled,
        // blurStrength,
        // setBlurStrength,
    } = useEffects();

    return (
        <Dropdown 
            title={t('changeEffectsPanel.title')} 
            childPosition={'origin-top-left top-12 left-0 space-y-4 p-4'} 
            containerPosition='left-4 top-4'
            showList={showList}
            setShowList={setShowList}
        >
            <div className={`flex flex-col space-y-2 ${ userHasPausedEffects ? 'opacity-50 pointer-events-none' : '' }`}>
                {/* Snow opacity */}
                <RangeInput 
                    name={t('changeEffectsPanel.snow')}
                    min={0} 
                    max={2} 
                    step={0.01} 
                    value={noiseOpacity} 
                    onChange={(e) => setNoiseOpacity(parseFloat(e.target.value))}
                />

                {/* Flicker */}
                <FlickerInputs />

                {/* Afterimages */}
                <AfterimagesInputs />
                
                {/* Bloom opacity */}
                <RangeInput
                    name={t('changeEffectsPanel.bloom')}
                    min={0}
                    max={10}
                    step={0.01}
                    value={bloomOpacity}
                    onChange={(e) => setBloomOpacity(parseFloat(e.target.value))}
                />
                
                {/* Brightness */}
                <RangeInput
                    name={t('changeEffectsPanel.brightness')}
                    min={-1}
                    max={1}
                    step={0.01}
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                />

                {/* Eye Floaters */}
                <EyeFloatersInputs /> 

                {/* Dizziness */}
                <DizzinessInputs />

                {/* Blur */}
                {/* <BlurInputs /> */}

                {/* Vignette */}
                <RangeInput
                    name={t('changeEffectsPanel.vignette')}
                    min={0}
                    max={1}
                    step={0.01}
                    value={vignetteStrength}
                    onChange={(e) => setVignetteStrength(parseFloat(e.target.value))}
                />

                <hr></hr>
                    
                <AudioControls />
                
            </div>
            <hr></hr>
            <ButtonRow />
        </Dropdown>    
    )
}