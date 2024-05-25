import { useAudio } from '@/components/context/AudioContext';
import { useTranslation } from 'react-i18next';
import { AudioControlComponent } from './AudioControlComponent';

export const AudioControls = () => {
    const { t } = useTranslation(['translation']);
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
                title={t('changeEffectsPanel.tinnitus')}
                isPlaying={isEffectsAudioPlaying}
                setIsPlaying={setIsEffectsAudioPlaying}
                volume={effectsVolume}
                setVolume={setEffectsVolume}
            />
            <AudioControlComponent
                title={t('changeEffectsPanel.ambient')}
                isPlaying={isAmbientPlaying}
                setIsPlaying={setIsAmbientPlaying}
                volume={ambientVolume}
                setVolume={setAmbientVolume}
            />
        </div>
        
    )
}