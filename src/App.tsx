import { AudioProvider, EffectsProvider, LoadingProvider } from './components/context';
import { Simulator } from './Simulator';

export default function App() {
    
    return (
        <LoadingProvider>
            <EffectsProvider>
                <AudioProvider>
                        <Simulator />
                </AudioProvider>
            </EffectsProvider>
        </LoadingProvider>
    );
}
