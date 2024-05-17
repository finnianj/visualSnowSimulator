import React from 'react'

import { useEffects } from '../context'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectsComposerLight, EffectsComposerHeavy } from './components' 

import { MapType } from '../../types'

type SceneProps = {
    currentMap: MapType;
    BackgroundComponent: React.FC;
}

export const Scene = ({ currentMap, BackgroundComponent }: SceneProps) => {
    const { nauseaEnabled } = useEffects();

    return (
        <Canvas className='cursor-grab active:cursor-grabbing'>
            <OrbitControls 
                reverseVerticalOrbit={nauseaEnabled}
                reverseHorizontalOrbit={nauseaEnabled}
            />
            <BackgroundComponent />
            <EffectsComposerLight currentMap={currentMap} />
            <EffectsComposerHeavy currentMap={currentMap} />
        </Canvas>
    )
}