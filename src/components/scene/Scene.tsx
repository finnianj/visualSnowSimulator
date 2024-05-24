import React from 'react'

import { useEffects } from '../context'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MainEffectsComposer } from './components' 

import { MapType } from '../../types'

type SceneProps = {
    currentMap: MapType;
    BackgroundComponent: React.FC;
}

export const Scene = ({ currentMap, BackgroundComponent }: SceneProps) => {
    const { dizzinessEnabled, userHasPausedEffects } = useEffects();

    return (
        <Canvas className='cursor-grab active:cursor-grabbing'>
            <OrbitControls 
                reverseVerticalOrbit={dizzinessEnabled && !userHasPausedEffects}
                reverseHorizontalOrbit={dizzinessEnabled && !userHasPausedEffects}
            />
            <BackgroundComponent />
            <MainEffectsComposer currentMap={currentMap} />
        </Canvas>
    )
}