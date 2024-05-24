import { Effect } from 'postprocessing';
import { Uniform, Vector2 } from 'three';

const fragmentShader = `
    uniform float frequency;
    uniform float amplitude;
    uniform float time;
    uniform bool enabled;

    void mainUv(inout vec2 uv)
    {
        if (!enabled) return;
        uv.y += sin(uv.x * frequency + time) * amplitude;
    }
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        if (!enabled) {
            outputColor = inputColor;
            return;
        }
        vec4 color = inputColor;
        color.rgb *= vec3(0.9, 1.0, 0.9);
        outputColor = color;
    }
`;

type DizzinessEffectProps = {
    enabled: boolean;
    frequency: number;
    amplitude: number;
}

type UniformType = Uniform<number> | Uniform<Vector2 | boolean>;

export default class DizzinessEffect extends Effect {
    constructor(props: DizzinessEffectProps)
    {
        super(
            'DizzinessEffect',
            fragmentShader,
            {
                uniforms: new Map<string, UniformType>([
                    ['enabled', new Uniform(props.enabled)],
                    ['frequency', new Uniform(props.frequency)],
                    ['amplitude', new Uniform(props.amplitude)],
                    [ 'time', new Uniform(0) ]
                ])
            }
        );
    }

    update(_renderer: any, _inputBuffer: any, deltaTime: number): void
    {
        (this.uniforms.get('time') as Uniform<number>).value += deltaTime;
    }

    onResize(): void {
        (this.uniforms.get('resolution') as Uniform<Vector2>).value.set(window.innerWidth, window.innerHeight);
    }
}