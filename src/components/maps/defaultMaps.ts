import { BlendFunction } from 'postprocessing'
import { MapType } from '@/components/types'

export const defaultMaps: MapType[] = [
    { 
        name: 'Quarry', 
        id: 'quarry', 
        blendFunction: BlendFunction.SOFT_LIGHT, 
        texture: undefined, 
        audio: './audio/wind.mp3',
        afterimageStrength: 0.8,
    },
    {
        name: 'Metro',
        id: 'metro',
        blendFunction: BlendFunction.SOFT_LIGHT,
        texture: undefined,
        audio: './audio/station.mp3',
        afterimageStrength: 0.6,
    },
    {
        name: 'Office',
        id: 'office',
        blendFunction: BlendFunction.SOFT_LIGHT,
        texture: undefined,
        audio: './audio/office.mp3',
        afterimageStrength: 0.6,
    },
    {
        name: 'Waterfront',
        id: 'waterfront',
        blendFunction: BlendFunction.SOFT_LIGHT,
        texture: undefined,
        audio: './audio/waterfront.mp3',
        afterimageStrength: 0.6,
    },
]
