import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
    uniform float frequency;
    uniform float amplitude;
    uniform float time;

    void mainUv(inout vec2 uv)
    {
        uv.y += sin(uv.x * frequency + time) * amplitude;
    }
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        vec4 color = inputColor;
        color.rgb *= vec3(0.8, 1.0, 0.5);
        outputColor = color;
    }
`;

type NauseaEffectProps = {
    frequency: number;
    amplitude: number;
}

export default class NauseaEffect extends Effect {
    constructor(props: NauseaEffectProps)
    {
        super(
            'NauseaEffect',
            fragmentShader,
            {
                uniforms: new Map([
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
}