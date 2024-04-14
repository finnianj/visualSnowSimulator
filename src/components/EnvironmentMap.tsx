import { Environment, useEnvironment } from '@react-three/drei'
import { Suspense } from 'react'

type EnvironmentMapProps = {
    setLoadingMap: (loading: boolean) => void
    maps: any[],
    mapIndex: number
}

export default function EnvironmentMap({ setLoadingMap, maps, mapIndex }: EnvironmentMapProps) {
    console.log('Loading map:', maps[mapIndex].name)

    return (
            <Environment
                files={maps[mapIndex].map}
                background
            />
    );
}