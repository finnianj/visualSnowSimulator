import React from 'react';

import { AudioPlayer } from '../audio/AudioPlayer';
import { ChangeMap, ChangeEffects, Info, Donate } from './';
import { MapType } from '../../types';

type UserInterfaceProps = {
    maps: MapType[];
    currentMap: MapType;
    changeMap: (map: MapType) => void;
    FallbackBackgroundComponent: React.FC;
}

export const UserInterface = ({ maps, currentMap, changeMap, FallbackBackgroundComponent }: UserInterfaceProps) => {

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
        </>

    )
}