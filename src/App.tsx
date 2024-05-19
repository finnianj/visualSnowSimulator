import { AudioProvider, EffectsProvider, LoadingProvider } from './components/context';
import { Simulator } from './Simulator';

export default function App() {
    
    return (
        <EffectsProvider>
            <LoadingProvider>
                <AudioProvider>
                        <Simulator />
                </AudioProvider>
            </LoadingProvider>
        </EffectsProvider>
    );
}
