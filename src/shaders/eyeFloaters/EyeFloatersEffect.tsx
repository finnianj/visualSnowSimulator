import { Effect } from 'postprocessing'
import { Uniform, TextureLoader, Vector2, Texture } from 'three'


const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D noiseTexture;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 col = inputColor.rgb; // Start with the input color
    float alpha = 0.0; // Start with fully transparent
    const int particle_count = 50;
    vec3 particleColor = vec3(0.2); // Grey color for the particles

    for (int i = 0; i < particle_count; i++) {
        // Sample noise texture for particle position, scaled to UV space
        float noise1 = texture2D(noiseTexture, vec2(float(i) / float(particle_count), 0.0)).r;
        float noise2 = texture2D(noiseTexture, vec2(float(i) / float(particle_count), 0.5)).r;

        // Use time to animate the particles
        vec2 timeOffset = vec2(sin(time + float(i)), cos(time + float(i))) * 0.01;
        
        // Map noise values to screen space
        vec2 particle_pos = vec2(noise1, noise2) + timeOffset;

        // Calculate distance from current fragment to particle position
        float d = distance(uv, particle_pos);
        float influence = (1.0 - d * 50.0) * float(d < 0.02); // Small influence radius

        col = mix(col, particleColor, influence); // Blend the particle color
        alpha = max(alpha, influence * 0.5); // Update alpha based on influence
    }

    outputColor = vec4(col, 1.0); // Use the computed alpha value for final color
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