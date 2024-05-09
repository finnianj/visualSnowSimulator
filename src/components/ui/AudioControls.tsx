import { useAudio } from '../context/AudioContext';

export const AudioControls = () => {
    const {
        isAmbientPlaying,
        setIsAmbientPlaying,
        isEffectsAudioPlaying,
        setIsEffectsAudioPlaying,
    } = useAudio();

    return (
        <div className='flex flex-col text-xs space-y-2'>

            <div className='flex items-center justify-between'>
                <label htmlFor='ambientAudioCheckbox' className='cursor-pointer'>Ambient Audio</label>
                <input 
                    type='checkbox'
                    id='ambientAudioCheckbox'
                    onChange={() => setIsAmbientPlaying(!isAmbientPlaying)}
                    checked={isAmbientPlaying}
                    className='accent-teal-600 cursor-pointer'
                />
            </div>

            <div className='flex items-center justify-between'>
                <label htmlFor='effectsAudioCheckbox' className='cursor-pointer'>Effects Audio</label>
                <input 
                    type='checkbox'
                    id='effectsAudioCheckbox'
                    onChange={() => setIsEffectsAudioPlaying(!isEffectsAudioPlaying)}
                    checked={isEffectsAudioPlaying}
                    className='accent-teal-600 cursor-pointer'
                />
            </div>
            
        </div>
        
    )
}