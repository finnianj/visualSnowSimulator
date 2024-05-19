import { Effect } from 'postprocessing'
import { Uniform, TextureLoader, Vector2, Texture } from 'three'

const fragmentShader = `
uniform float time;
uniform float intensity;
uniform bool enabled;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 color = inputColor;

    if (enabled) {
        // Calculate flicker based on time
        float flickerFrequency = 0.04; 
        float flicker = step(0.5, fract(time / flickerFrequency)) * intensity;

        // Apply flicker to the input color
        color.rgb *= (1.0 + flicker); // Modulate brightness
    }

    outputColor = color;
}
`;

type FlickerEffectProps = {
    enabled: boolean;
    textureUrl: string;
    intensity: number;
}

type UniformType = Uniform<number> | Uniform<Vector2> | Uniform<Texture | boolean>;

export default class FlickerEffectImpl extends Effect {
    constructor({ 
        enabled,
        textureUrl, 
        intensity,
     }: FlickerEffectProps) {
        super(
            'FlickerEffect', 
            fragmentShader, 
            {
                uniforms: new Map<string, UniformType>([
                    ['enabled', new Uniform(enabled)],
                    ['time', new Uniform(0)],
                    ['noiseTexture', new Uniform(new TextureLoader().load(textureUrl))],
                    ['intensity', new Uniform(intensity)],

                ]),
            }
        );
    }

    update(_renderer: any, _inputBuffer: any, deltaTime: number): void
    {
        (this.uniforms.get('time') as Uniform<number>).value += deltaTime;
    }
}