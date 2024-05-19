import { Suspense, useEffect, useState } from 'react';

import { useLoading, useEffects, UIProvider } from './components/context'

import { Scene } from './components/scene/Scene';
import { UserInterface } from './components/ui/UserInterface';
import Loading from './components/ui/modals/Loading';

import { useMaps } from './hooks';

import { effectsQueryParamMap } from './components/helpers/utils';
import { Modal } from './components/ui/modals/Modal';
import { WelcomeModal } from './components/ui/modals/WelcomeModal';

export const Simulator = () => {
    const { LoadingModal } = useLoading();
    const { usePreviousConfig } = useEffects();
    const { maps, currentMap, changeMap, BackgroundComponent, FallbackBackgroundComponent } = useMaps();
    
    const [showWelcomeModal, setShowWelcomeModal] = useState(true)
    const [prevConfig, setPrevConfig] = useState<{[key: string]: string}>({})

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
        setPrevConfig(config)
        usePreviousConfig(config)
        // Show welcome modal and reference the previous config
        setShowWelcomeModal(true)
    }, [])

    return (
        <Suspense fallback={<Loading />}>
            <LoadingModal />
            <UIProvider>
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

                <Modal modalOpen={showWelcomeModal} setModalOpen={setShowWelcomeModal}>
                    <WelcomeModal prevConfig={prevConfig} setShowWelcomeModal={setShowWelcomeModal} />
                </Modal>
            </UIProvider>
        </Suspense>
    )
}