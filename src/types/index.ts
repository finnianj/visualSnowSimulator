import { BlendFunction } from 'postprocessing';
import { Texture } from 'three';

export type MapType = {
    name: string;
    id: string;
    blendFunction: BlendFunction;
    texture: Texture | undefined;
}