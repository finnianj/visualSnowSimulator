import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';


import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export const Afterimage = () => {
    const { gl, scene, camera, size } = useThree();
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const afterimagePass = new AfterimagePass();

    composer.addPass(renderPass);
    composer.addPass(afterimagePass);

    afterimagePass.uniforms.damp.value = 0.9
    afterimagePass.enabled = true


    useEffect(() => {
        composer.setSize(size.width, size.height);
    }, [size]);

    useFrame(() => composer.render(), 1);

    return null;
}
