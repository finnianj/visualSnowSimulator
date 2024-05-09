import { useAudio } from '../context/AudioContext';

export const AudioControls = () => {
    const {
        isAmbientPlaying,
        setIsAmbientPlaying,
        isEffectsAudioPlaying,
        setIsEffectsAudioPlaying,
    } = useAudio();

    return (
        <div>
            <button onClick={() => setIsAmbientPlaying(!isAmbientPlaying)}>
                {isAmbientPlaying ? 'Pause Ambient' : 'Play Ambient'}
            </button>
            <button onClick={() => setIsEffectsAudioPlaying(!isEffectsAudioPlaying)}>
                {isEffectsAudioPlaying ? 'Pause Effects' : 'Play Effects'}
            </button>
        </div>
        
    )
}