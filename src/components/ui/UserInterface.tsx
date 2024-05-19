import React, { useState} from 'react';

import { AudioPlayer } from '../audio/AudioPlayer';
import { ChangeMap, ChangeEffects, Info, Donate } from './';
import { MapType } from '../../types';

import { Modal } from './modals/Modal';
import { FlickerWarningModal } from './modals/FlickerWarningModal';

type UserInterfaceProps = {
    maps: MapType[];
    currentMap: MapType;
    changeMap: (map: MapType) => void;
    FallbackBackgroundComponent: React.FC;
}

export const UserInterface = ({ maps, currentMap, changeMap, FallbackBackgroundComponent }: UserInterfaceProps) => {
    const [showFlickerWarning, setShowFlickerWarning] = useState(false);
    const [hasSeenFlickerWarning, setHasSeenFlickerWarning] = useState(false);

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
            <ChangeEffects 
                hasSeenFlickerWarning={hasSeenFlickerWarning}
                setShowFlickerWarning={setShowFlickerWarning}
            />
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
        </>

    )
}