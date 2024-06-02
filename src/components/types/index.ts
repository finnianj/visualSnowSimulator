import { Texture } from 'three';
import { BlendFunction } from 'postprocessing';

export type MapType = {
    name: string;
    id: string;
    blendFunction: BlendFunction;
    texture: Texture | undefined;
    audio?: string;
    afterimageStrength: number;
}