import { Effect } from 'postprocessing';

const fragmentShader = `
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

            }
        );
    }
}