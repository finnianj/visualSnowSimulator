import { I18nextProvider } from "react-i18next";
import { AudioProvider, EffectsProvider, LoadingProvider } from './components/context';
import { Simulator } from './Simulator';
import { MobileNotSupported } from './components/ui/MobileNotSupported';

import i18nInstance from '@/components/i18n/i18n'
    
export default function App() {    
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        return <MobileNotSupported />;
    }

    return (
        <I18nextProvider i18n={i18nInstance}>
            <EffectsProvider>
                <LoadingProvider>
                    <AudioProvider>
                        <Simulator />
                    </AudioProvider>
                </LoadingProvider>
            </EffectsProvider>
        </I18nextProvider>
    );
}
