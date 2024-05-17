import { Effect } from 'postprocessing';
import { Uniform, Vector2 } from 'three';

const fragmentShader = `
    uniform float strength;
    uniform vec2 resolution;
    uniform bool enabled;

    vec4 blur(sampler2D image, vec2 uv, vec2 resolution, float radius) {
        vec4 color = vec4(0.0);
        float total = 0.0;

        for (float x = -radius; x <= radius; x++) {
            for (float y = -radius; y <= radius; y++) {
                vec2 offset = vec2(x, y) / resolution;
                float weight = exp(-(x*x + y*y) / (2.0 * radius * radius));
                color += texture2D(image, uv + offset) * weight;
                total += weight;
            }
        }
        return color / total;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        if (enabled) {
            outputColor = blur(inputBuffer, uv, resolution, strength);
        } else {
            outputColor = inputColor;
        }
    }
`;

type BlurEffectProps = {
    strength: number;
    enabled: boolean;
}

type UniformType = Uniform<number> | Uniform<Vector2 | boolean>;

export default class BlurEffect extends Effect {
    constructor(props: BlurEffectProps)
    {
        super(
            'BlurEffect',
            fragmentShader,
            {
                uniforms: new Map<string, UniformType>([
                    ['enabled', new Uniform(props.enabled)],
                    ['strength', new Uniform(props.strength)],
                    ['resolution', new Uniform(new Vector2(window.innerWidth, window.innerHeight))]
                ])
            }
        );

        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize(): void {
        (this.uniforms.get('resolution') as Uniform<Vector2>).value.set(window.innerWidth, window.innerHeight);
    }
}
