import { Suspense, useEffect } from 'react';

import { useLoading, useEffects } from './components/context'

import { Scene } from './components/scene/Scene';
import { UserInterface } from './components/ui/UserInterface';
import Loading from './components/ui/modals/Loading';

import { useMaps } from './hooks';

import { effectsQueryParamMap } from './components/helpers/utils';

export const Simulator = () => {
    const { LoadingModal } = useLoading();
    const { usePreviousConfig } = useEffects();
    const { maps, currentMap, changeMap, BackgroundComponent, FallbackBackgroundComponent } = useMaps();

    useEffect(() => {
        // Apply config from query params
        const config: {[key: string]: string} = {} 
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.size) return;

        // Get values using effectsQueryParamMap
        for (const key in effectsQueryParamMap) {
            const value = urlParams.get(effectsQueryParamMap[key as keyof typeof effectsQueryParamMap])
            if (value) {
                config[key] = value
            }
        }
        console.log('Applying settings from url query params: ', config)
        usePreviousConfig(config)
    }, [])

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