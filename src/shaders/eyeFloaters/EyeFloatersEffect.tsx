import { Effect } from 'postprocessing'
import { Uniform, TextureLoader, Vector2, Texture } from 'three'


const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D noiseTexture;


void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 newUV = uv;
    newUV.x *= resolution.x / resolution.y;
    newUV.x -= 0.4;

    vec3 col = inputColor.rgb; // Start with the input color
    float alpha = 0.0; // Start with fully transparent
    const int particle_count = 50;
    vec3 floaterColor = vec3(0.5); // Grey color for the floaters

    for (int i = 0; i < particle_count; i++) {
        float noise1 = texture2D(noiseTexture, vec2(float(i) * 0.005, 0.0)).r;
        float noise2 = texture2D(noiseTexture, vec2((float(i) + 10.0) * 0.005, 0.0)).r;
        float noise3 = texture2D(noiseTexture, vec2(float(i) * 0.005, time * 0.2)).r;
        float noise4 = texture2D(noiseTexture, vec2((float(i) + 10.0) * 0.005, time * 0.2)).r;

        vec2 particle_pos = vec2(0.20) + vec2(noise1, noise2) * 0.5 + vec2(noise3, noise4) * 0.05;
        float d = distance(newUV, particle_pos);
        float influence = (1.0 - d * 50.0) * float(d < 0.02);

        col = mix(col, floaterColor, influence); // Blend the floater color
        alpha = max(alpha, influence * 0.5); // Semi-transparent floaters
    }

    col = clamp(col, 0.0, 1.0); // Ensure the color values are clamped between 0 and 1
    outputColor = vec4(mix(inputColor.rgb, col, alpha), inputColor.a); // Use the computed alpha value
}
`;

type EyeFloatersEffectProps = {
    textureUrl: string;
}

type UniformType = Uniform<number> | Uniform<Vector2> | Uniform<Texture>;

export default class EyeFloatersEffectImpl extends Effect {
    constructor({ textureUrl }: EyeFloatersEffectProps) {
        super(
            'EyeFloatersEffect', 
            fragmentShader, 
            {
                uniforms: new Map<string, UniformType>([
                    ['time', new Uniform(0)],
                    ['resolution', new Uniform(new Vector2(window.innerWidth, window.innerHeight))],
                    ['noiseTexture', new Uniform(new TextureLoader().load(textureUrl))],
                ]),
            }
        );
    }

    update(_renderer: any, _inputBuffer: any, deltaTime: number): void
    {
        (this.uniforms.get('time') as Uniform<number>).value += deltaTime;
    }

}