import React, { forwardRef, useMemo } from 'react'
import { Uniform, TextureLoader } from 'three'
import { Effect } from 'postprocessing'
import { Vector2 } from 'three'

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uNoiseTexture;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 newUV = uv;
    newUV.x *= uResolution.x / uResolution.y;
    newUV.x -= 0.4;

    vec3 col = vec3(0.0, 0.0, 0.0);
    float alpha = 0.0; // Start with fully transparent
    const int particle_count = 50;

    for (int i = 0; i < particle_count; i++) {
        float noise1 = texture2D(uNoiseTexture, vec2(float(i) * 0.005, 0.0)).r;
        float noise2 = texture2D(uNoiseTexture, vec2((float(i) + 10.0) * 0.005, 0.0)).r;
        float noise3 = texture2D(uNoiseTexture, vec2(float(i) * 0.005, uTime * 0.2)).r;
        float noise4 = texture2D(uNoiseTexture, vec2((float(i) + 10.0) * 0.005, uTime * 0.2)).r;

        vec2 particle_pos = vec2(0.20) + vec2(noise1, noise2) * 0.5 + vec2(noise3, noise4) * 0.05;
        float d = distance(newUV, particle_pos);
        float influence = (1.0 - d * 50.0) * float(d < 0.02);

        col += vec3(1.0) * influence;
        alpha = max(alpha, influence); // Update alpha to be visible where there are particles
    }

    col = 1.0 - col;
    outputColor = vec4(col, 0); // Set alpha to show particles and keep other areas transparent
}
`

class EyeFloatersEffectImpl extends Effect {
    constructor({ textureUrl, time = 0 } = {}) {
        super('EyeFloatersEffect', fragmentShader, {
            uniforms: new Map([
                ['uTime', new Uniform(time)],
                ['uResolution', new Uniform(new Vector2(window.innerWidth, window.innerHeight))],
                ['uNoiseTexture', new Uniform(new TextureLoader().load(textureUrl))]
            ]),
        });
    }

    update(renderer, inputBuffer, deltaTime) {
        this.uniforms.get('uTime').value += deltaTime;
    }
}

export const EyeFloatersEffect = forwardRef(({ textureUrl, time }, ref) => {
    const effect = useMemo(() => new EyeFloatersEffectImpl({ textureUrl, time }), [textureUrl, time]);
    return <primitive ref={ref} object={effect} dispose={null} />;
});