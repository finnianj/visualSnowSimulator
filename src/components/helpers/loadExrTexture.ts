import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import * as THREE from 'three';

export const loadExrTexture = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const loader = new EXRLoader();
        loader.load(url, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            resolve(texture);
        }, undefined, (error) => {
            reject(error);
        });
    });
};
