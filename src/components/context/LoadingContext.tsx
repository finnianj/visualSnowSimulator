import React, { createContext, useContext, useEffect, useState } from 'react';

import { useEffects } from './effects/EffectsContext';
import Loading from '../ui/modals/Loading';

// Define the type for the context state
type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    LoadingModal: () => JSX.Element | null;
};

// Create the context with a default dummy state
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider component
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { disableAllEffects, setDisableAllEffects } = useEffects();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isLoading) {
            setDisableAllEffects(true);
        } else if (!isLoading && !disableAllEffects){
            setDisableAllEffects(false);
        }
    }, [isLoading, setDisableAllEffects]);

    const LoadingModal = () => {
        if (!isLoading) return null;
        return <Loading />
    }

    const value = { 
        isLoading, 
        setIsLoading,
        LoadingModal
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

// Hook to use the Loading context
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within an LoadingProvider');
    }
    return context;
};