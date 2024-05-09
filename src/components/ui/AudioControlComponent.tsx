import { RangeInput } from './RangeInput';

type AudioControlComponentProps = {
    title: string;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
}

export const AudioControlComponent = ({title, isPlaying, setIsPlaying, volume, setVolume}: AudioControlComponentProps) => {
    return (
        <div className='flex flex-col'>
            <p className='text-sm'>{title}</p>
            <div className='flex items-center justify-between space-x-2 p-2'>
                <label htmlFor='ambientAudioCheckbox' className='cursor-pointer'>Playing</label>
                <input 
                    type='checkbox'
                    id='ambientAudioCheckbox'
                    onChange={() => setIsPlaying(!isPlaying)}
                    checked={isPlaying}
                    className='accent-teal-600 cursor-pointer'
                />
            </div>
            <div className='flex items-center justify-between space-x-2 p-2'>
                <p>Volume</p>
                <RangeInput
                    name={null}
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
            </div>
        </div>
    )
}