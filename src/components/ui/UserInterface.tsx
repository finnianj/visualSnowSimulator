import React from 'react';

import { useUI } from '@/components/context';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { ChangeMap, ChangeEffects, Info, Donate } from './components';
import { MapType } from '@/components/types';

import { Modal } from './modals/Modal';
import { FlickerWarningModal } from './modals/FlickerWarningModal';
import { ShareConfigModal } from './modals/ShareConfigModal';

type UserInterfaceProps = {
    maps: MapType[];
    currentMap: MapType;
    changeMap: (map: MapType) => void;
    FallbackBackgroundComponent: React.FC;
}

export const UserInterface = ({ maps, currentMap, changeMap, FallbackBackgroundComponent }: UserInterfaceProps) => {
    const { showFlickerWarning, setShowFlickerWarning, hasSeenFlickerWarning, setHasSeenFlickerWarning, showShareConfigModal, setShowShareConfigModal } = useUI();

    return (
        <>
            {/* Audio */}
            <AudioPlayer />

            {/* UI */}
            <ChangeMap 
                maps={maps}
                currentMap={currentMap}
                changeMap={changeMap}
            />
            <ChangeEffects />
            <Info />
            <Donate />

            {/* Fallback background */}
            <FallbackBackgroundComponent />

            {/* Flicker warning modal */}
            <Modal modalOpen={showFlickerWarning} setModalOpen={setShowFlickerWarning}>
                <FlickerWarningModal 
                    setShowFlickerWarning={setShowFlickerWarning} 
                    setHasSeenFlickerWarning={setHasSeenFlickerWarning}
                />
            </Modal>

            {/* Share Config modal */}
            <Modal modalOpen={showShareConfigModal} setModalOpen={setShowShareConfigModal}>
                <ShareConfigModal />
            </Modal>
        </>

    )
}