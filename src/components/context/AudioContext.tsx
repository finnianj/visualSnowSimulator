import React, { createContext, useContext, useState } from 'react';

// Define the type for the context state
type AudioContextType = {
    ambientAudioSrc: string;
    effectsAudioSrc: string;
    isAmbientPlaying: boolean;
    isEffectsAudioPlaying: boolean;
    setAmbientAudioSrc: (src: string) => void;
    setEffectsAudioSrc: (src: string) => void;
    setIsAmbientPlaying: (isPlaying: boolean) => void;
    setIsEffectsAudioPlaying: (isPlaying: boolean) => void;
};

// Create the context with a default dummy state
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Provider component
export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [effectsAudioSrc, setEffectsAudioSrc] = useState<string>('./audio/tinnitus.mp3');
    const [ambientAudioSrc, setAmbientAudioSrc] = useState<string>('');
    const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
    const [isEffectsAudioPlaying, setIsEffectsAudioPlaying] = useState<boolean>(false);

    const value = { 
        ambientAudioSrc, 
        setAmbientAudioSrc, 
        isAmbientPlaying,
        setIsAmbientPlaying, 

        effectsAudioSrc,
        setEffectsAudioSrc,
        isEffectsAudioPlaying,
        setIsEffectsAudioPlaying
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};

// Hook to use the audio context
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
