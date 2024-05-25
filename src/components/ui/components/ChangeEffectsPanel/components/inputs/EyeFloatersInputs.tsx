import { useEffects } from '@/components/context';

import { useTranslation } from 'react-i18next';

import { RangeInput, CheckBoxInput } from '.';

export const EyeFloatersInputs = () => {
    const { t } = useTranslation(['translation']);

    const { 
        smallEyeFloatersEnabled,
        setSmallEyeFloatersEnabled,
        smallEyeFloatersCount,
        setSmallEyeFloatersCount,
        smallEyeFloatersTransparency,
        setSmallEyeFloatersTransparency,
        smallEyeFloatersSize,
        setSmallEyeFloatersSize,
        smallEyeFloatersColor,
        setSmallEyeFloatersColor,

        largeEyeFloatersEnabled,
        setLargeEyeFloatersEnabled,
        largeEyeFloatersCount,
        setLargeEyeFloatersCount,
        largeEyeFloatersTransparency,
        setLargeEyeFloatersTransparency,
        largeEyeFloatersSize,
        setLargeEyeFloatersSize,
        largeEyeFloatersColor,
        setLargeEyeFloatersColor
    } = useEffects()


    return (
        <div>
            {/* Small Eye Floaters */}
            <CheckBoxInput
                label={t('changeEffectsPanel.smallEyeFloaters')}
                checked={smallEyeFloatersEnabled}
                onChange={() => setSmallEyeFloatersEnabled(!smallEyeFloatersEnabled)}
            />
            <RangeInput
                name={t('changeEffectsPanel.sefCount')}
                min={0}
                max={20}
                step={1}
                value={smallEyeFloatersCount}
                onChange={(e) => setSmallEyeFloatersCount(parseInt(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={t('changeEffectsPanel.sefIntensity')}
                min={0}
                max={1}
                step={0.01}
                value={smallEyeFloatersTransparency}
                onChange={(e) => setSmallEyeFloatersTransparency(parseFloat(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={t('changeEffectsPanel.sefSize')}
                min={0}
                max={0.03}
                step={0.001}
                value={smallEyeFloatersSize}
                onChange={(e) => setSmallEyeFloatersSize(parseFloat(e.target.value))}
                indent={true}
            />
            {/* <RangeInput
                name={'SEF Lightness'}
                min={0}
                max={0.05}
                step={0.001}
                value={smallEyeFloatersColor}
                onChange={(e) => setSmallEyeFloatersColor(parseFloat(e.target.value))}
            /> */}

            <div className='h-2' />
            {/* Large Eye Floaters */}
            <CheckBoxInput
                label={t('changeEffectsPanel.largeEyeFloaters')}
                checked={largeEyeFloatersEnabled}
                onChange={() => setLargeEyeFloatersEnabled(!largeEyeFloatersEnabled)}
            />
            <RangeInput
                name={t('changeEffectsPanel.lefCount')}
                min={1}
                max={5}
                step={1}
                value={largeEyeFloatersCount}
                onChange={(e) => setLargeEyeFloatersCount(parseInt(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={t('changeEffectsPanel.lefIntensity')}
                min={0}
                max={1}
                step={0.01}
                value={largeEyeFloatersTransparency}
                onChange={(e) => setLargeEyeFloatersTransparency(parseFloat(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={t('changeEffectsPanel.lefSize')}
                min={0.05}
                max={0.2}
                step={0.001}
                value={largeEyeFloatersSize}
                onChange={(e) => setLargeEyeFloatersSize(parseFloat(e.target.value))}
                indent={true}
            />
            {/* <RangeInput
                name={'LEF Lightness'}
                min={0}
                max={0.5}
                step={0.01}
                value={largeEyeFloatersColor}
                onChange={(e) => setLargeEyeFloatersColor(parseFloat(e.target.value))}
            /> */}
        </div>
    )
}