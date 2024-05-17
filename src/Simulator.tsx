import { Suspense } from 'react';

import { useLoading } from './components/context'

import { Scene } from './components/scene/Scene';
import { UserInterface } from './components/ui/UserInterface';
import Loading from './components/ui/modals/Loading';

import { useMaps } from './hooks';

export const Simulator = () => {
    const { LoadingModal } = useLoading();
    const { maps, currentMap, changeMap, BackgroundComponent, FallbackBackgroundComponent } = useMaps();

    return (
        <Suspense fallback={<Loading />}>
            <LoadingModal />
            <UserInterface
                maps={maps}
                currentMap={currentMap}
                changeMap={changeMap}
                FallbackBackgroundComponent={FallbackBackgroundComponent}
            />
            <Scene 
                currentMap={currentMap}
                BackgroundComponent={BackgroundComponent} 
            />
        </Suspense>

    )
}