import { I18nextProvider } from "react-i18next";
import { AudioProvider, EffectsProvider, LoadingProvider } from './components/context';
import { Simulator } from './Simulator';

import i18nInstance from '@/components/i18n/i18n'

export default function App() {    

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
