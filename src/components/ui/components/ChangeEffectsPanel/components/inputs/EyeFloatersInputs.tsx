import { useEffects } from '../../../../../context';

import { RangeInput, CheckBoxInput } from '.';

export const EyeFloatersInputs = () => {
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
                label='Small Eye Floaters'
                checked={smallEyeFloatersEnabled}
                onChange={() => setSmallEyeFloatersEnabled(!smallEyeFloatersEnabled)}
            />
            <RangeInput
                name={'SEF Count'}
                min={0}
                max={20}
                step={1}
                value={smallEyeFloatersCount}
                onChange={(e) => setSmallEyeFloatersCount(parseInt(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={'SEF Intensity'}
                min={0}
                max={1}
                step={0.01}
                value={smallEyeFloatersTransparency}
                onChange={(e) => setSmallEyeFloatersTransparency(parseFloat(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={'SEF Size'}
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
                label='Large Eye Floaters'
                checked={largeEyeFloatersEnabled}
                onChange={() => setLargeEyeFloatersEnabled(!largeEyeFloatersEnabled)}
            />
            <RangeInput
                name={'LEF Count'}
                min={1}
                max={5}
                step={1}
                value={largeEyeFloatersCount}
                onChange={(e) => setLargeEyeFloatersCount(parseInt(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={'LEF Intensity'}
                min={0}
                max={1}
                step={0.01}
                value={largeEyeFloatersTransparency}
                onChange={(e) => setLargeEyeFloatersTransparency(parseFloat(e.target.value))}
                indent={true}
            />
            <RangeInput
                name={'LEF Size'}
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