import { useTranslation } from 'react-i18next';

import { RangeInput } from '@/ui/components/ChangeEffectsPanel/components/inputs/RangeInput';

type AudioControlComponentProps = {
    title: string;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
}

export const AudioControlComponent = ({title, isPlaying, setIsPlaying, volume, setVolume}: AudioControlComponentProps) => {
    const { t } = useTranslation(['translation']);

    return (
        <div className='flex flex-col text-xxs'>
            <div className='flex items-center justify-between space-x-2'>
                <label htmlFor='ambientAudioCheckbox' className='cursor-pointer'>{title}</label>
                <input 
                    type='checkbox'
                    id='ambientAudioCheckbox'
                    onChange={() => setIsPlaying(!isPlaying)}
                    checked={isPlaying}
                    className='accent-teal-600 cursor-pointer'
                />
            </div>
            <div className='flex items-center justify-between space-x-2'>
                <RangeInput
                    name={t('changeEffectsPanel.volume')}
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    indent={true}
                />
            </div>
        </div>
    )
}