import React, { useEffect, useRef } from 'react';
import { useAudio, useEffects } from '../context';

export const AudioPlayer: React.FC = () => {
    const ambientAudioRef = useRef<HTMLAudioElement>(null);
    const effectAudioRef = useRef<HTMLAudioElement>(null);
    const {
        ambientAudioSrc,
        isAmbientPlaying,
        effectsAudioSrc,
        isEffectsAudioPlaying,
        ambientVolume,
        effectsVolume,
    } = useAudio();
    const { isSimulatorOn } = useEffects();

    // Handle playback of ambient audio
    useEffect(() => {
        const ambientAudio = ambientAudioRef.current;
        if (!ambientAudio) return;

        // Updating the source and playing/pausing based on props
        ambientAudio.src = ambientAudioSrc;
        if (isAmbientPlaying) {
            ambientAudio.play().catch(error => console.error('Error playing ambient audio:', error));
        } else {
            ambientAudio.pause();
        }

        // Restart the audio if it ends
        ambientAudio.onended = () => {
            ambientAudio.play().catch(error => console.error('Error playing ambient audio:', error));
        };

        return () => {
            ambientAudio.pause();
        };
    }, [ambientAudioSrc, isAmbientPlaying]);

    // Handle playback of effects audio
    useEffect(() => {
        const effectAudio = effectAudioRef.current;
        if (!effectAudio) return;

        // Updating the source and playing/pausing based on props
        effectAudio.src = effectsAudioSrc;
        if (isEffectsAudioPlaying) {
            effectAudio.play().catch(error => console.error('Error playing effects audio:', error));
        } else {
            effectAudio.pause();
        }

        // Restart the audio if it ends
        effectAudio.onended = () => {
            effectAudio.play().catch(error => console.error('Error playing effects audio:', error));
        };

        return () => {
            effectAudio.pause();
        };
    }, [effectsAudioSrc, isEffectsAudioPlaying]);

    useEffect(() => {
        const ambientAudio = ambientAudioRef.current;
        const effectAudio = effectAudioRef.current;
        if (!ambientAudio || !effectAudio) return;

        // Volume control
        ambientAudio.volume = ambientVolume;
        effectAudio.volume = effectsVolume;
    }, [ambientVolume, effectsVolume]);  

    useEffect(() => {
        // If isSimulatorOn is false, pause all audio
        const ambientAudio = ambientAudioRef.current;
        const effectAudio = effectAudioRef.current;
        if (!ambientAudio || !effectAudio) return;

        if (!isSimulatorOn) {
            ambientAudio.pause();
            effectAudio.pause();
        } else {
            if (isAmbientPlaying) {
                ambientAudio.play().catch(error => console.error('Error playing ambient audio:', error));
            }
            if (isEffectsAudioPlaying) {
                effectAudio.play().catch(error => console.error('Error playing effects audio:', error));
            }
        }
    }, [isSimulatorOn]);

    return (
        <div>
            <audio ref={ambientAudioRef} className='invisible'>
                <source src={`${ambientAudioRef}`} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={effectAudioRef} className='invisible'>
                <source src={effectsAudioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

