import { useMemo } from 'react'
import { useEnvironment } from '@react-three/drei'
import { BlendFunction } from 'postprocessing'


export const useMaps = () => {
    const berlin = useMemo(() => useEnvironment({ files: './environmentMaps/hdri/berlin.exr' }), [])
    const garden = useMemo(() => useEnvironment({ files: './environmentMaps/hdri/garden.exr' }), [])
    const metro = useMemo(() => useEnvironment({ files: './environmentMaps/hdri/metro.exr' }), [])
    const road = useMemo(() => useEnvironment({ files: './environmentMaps/hdri/road.exr' }), [])

    const maps = [
        {name: 'Berlin', map: './environmentMaps/hdri/berlin.exr', blendFunction: BlendFunction.SOFT_LIGHT},
        {name: 'Garden', map: './environmentMaps/hdri/garden.exr', blendFunction: BlendFunction.SOFT_LIGHT},
        {name: 'Metro', map: './environmentMaps/hdri/metro.exr', blendFunction: BlendFunction.HARD_LIGHT},
        {name: 'Road', map: './environmentMaps/hdri/road.exr', blendFunction: BlendFunction.SOFT_LIGHT}
    ]

    return { berlin, garden, metro, road, maps }
}