import { useAudio } from '../context/AudioContext';
import { AudioControlComponent } from './AudioControlComponent';

export const AudioControls = () => {
    const {
        isAmbientPlaying,
        setIsAmbientPlaying,
        isEffectsAudioPlaying,
        setIsEffectsAudioPlaying,
        ambientVolume,
        effectsVolume,
        setAmbientVolume,
        setEffectsVolume
    } = useAudio();

    return (
        <div className='flex flex-col text-xs space-y-2'>

            <AudioControlComponent
                title='Ambient Audio'
                isPlaying={isAmbientPlaying}
                setIsPlaying={setIsAmbientPlaying}
                volume={ambientVolume}
                setVolume={setAmbientVolume}
            />

            <AudioControlComponent
                title='Effects Audio'
                isPlaying={isEffectsAudioPlaying}
                setIsPlaying={setIsEffectsAudioPlaying}
                volume={effectsVolume}
                setVolume={setEffectsVolume}
            />
            
        </div>
        
    )
}