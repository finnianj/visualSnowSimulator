import React, { createContext, useContext, useState } from 'react';

// Define the type for the context state
type UIContextType = {
    locale: string;
    setLocale: (locale: string) => void;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    showFlickerWarning: boolean;
    setShowFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
    hasSeenFlickerWarning: boolean;
    setHasSeenFlickerWarning: React.Dispatch<React.SetStateAction<boolean>>;
    showShareConfigModal: boolean;
    setShowShareConfigModal: React.Dispatch<React.SetStateAction<boolean>>;
    showAddMapModal: boolean;
    setShowAddMapModal: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    setName: (name: string) => void;
};

// Create the context with a default dummy state
const UIContext = createContext<UIContextType | undefined>(undefined);

// Provider component
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [locale, setLocale] = useState<string>('en');
   const [darkMode, setDarkMode] = useState<boolean>(false);
   const [showFlickerWarning, setShowFlickerWarning] = useState(false);
   const [hasSeenFlickerWarning, setHasSeenFlickerWarning] = useState(false);

   const [showShareConfigModal, setShowShareConfigModal] = useState(false);
   const [showAddMapModal, setShowAddMapModal] = useState(false);
   const [name, setName] = useState<string>('');

    const value = { 
        locale, 
        setLocale, 
        darkMode, 
        setDarkMode, 
        showFlickerWarning, 
        setShowFlickerWarning, 
        hasSeenFlickerWarning, 
        setHasSeenFlickerWarning, 
        showShareConfigModal, 
        setShowShareConfigModal, 
        showAddMapModal,
        setShowAddMapModal,
        name, 
        setName
    };

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
};

// Hook to use the UI context
export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within an UIProvider');
    }
    return context;
};
