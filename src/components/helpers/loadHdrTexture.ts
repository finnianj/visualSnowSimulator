import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as THREE from 'three';

const loader = new RGBELoader();

export async function loadHdrTexture( url: string ) {
    return new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(
            url,
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                resolve(texture)
            },
            () => {},
            (error) => reject(error)
        );
    });
}
