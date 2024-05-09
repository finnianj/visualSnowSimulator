import { BlendFunction } from 'postprocessing'
import { MapType } from '../../types'

export const defaultMaps: MapType[] = [
    { name: 'Quarry', id: 'quarry', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined, audio: 'wind' },
    { name: 'Metro', id: 'metro', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined },
    { name: 'Office', id: 'office', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined },
    { name: 'Waterfront', id: 'waterfront', blendFunction: BlendFunction.SOFT_LIGHT, texture: undefined },
]
