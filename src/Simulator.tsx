import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import { useLoading, useEffects, UIProvider } from '@/components/context'

import { Scene } from '@/components/scene/Scene';
import { UserInterface } from '@/components/ui/UserInterface';
import Loading from '@/components/ui/modals/Loading';

import { useMaps } from '@/components/hooks'

import { effectsQueryParamMap } from '@/components/helpers/utils';
import { Modal } from '@/components/ui/modals/Modal';
import { WelcomeModal } from '@/components/ui/modals/WelcomeModal';

export const Simulator = () => {
    THREE.Cache.enabled = true;

    const { LoadingModal, isLoading } = useLoading();
    const { usePreviousConfig } = useEffects();
    const { maps, setMaps, currentMap, setCurrentMap, changeMap, BackgroundComponent, FallbackBackgroundComponent, firstMapLoaded } = useMaps();
    
    const [showWelcomeModal, setShowWelcomeModal] = useState(false)
    const [prevConfig, setPrevConfig] = useState<{[key: string]: string}>({})
    const [initialised, setInitialised] = useState(false)

    useEffect(() => {
        if (initialised || !firstMapLoaded) return;
        // Apply config from query params
        const config: {[key: string]: string} = {} 
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.size) {
            setShowWelcomeModal(true)
            setInitialised(true)
            return;
        };

        // Get values using effectsQueryParamMap
        for (const key in effectsQueryParamMap) {
            const value = urlParams.get(effectsQueryParamMap[key as keyof typeof effectsQueryParamMap])
            if (value) {
                config[key] = value
            }
        }
        setPrevConfig(config)
        usePreviousConfig(config)
        // Show welcome modal and reference the previous config
        setShowWelcomeModal(true)
        setInitialised(true)
    }, [firstMapLoaded])

    return (
        <Suspense fallback={<Loading />}>
            <LoadingModal />
            <UIProvider>
                <UserInterface
                    maps={maps}
                    setMaps={setMaps}
                    currentMap={currentMap}
                    setCurrentMap={setCurrentMap}
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