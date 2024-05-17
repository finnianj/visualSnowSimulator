import { Effect } from 'postprocessing'
import { Uniform, TextureLoader, Vector2, Texture } from 'three'


const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D noiseTexture;
uniform int particle_count;
uniform float particle_transparency;
uniform float particle_size;
uniform float particle_color;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 col = inputColor.rgb; // Start with the input color
    float alpha = inputColor.a; // Start with the input alpha
    vec3 particleColor = vec3(particle_color); // Grey color for the particles

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
        float influence = smoothstep(particle_size, 0.0, d); // Smoothstep for smoother transition

        // Blend the particle color with input color
        col = mix(col, particleColor, influence * particle_transparency); // Blend the particle color
        alpha = max(alpha, influence * particle_transparency); // Adjust alpha based on influence and transparency
    }


    outputColor = vec4(col, alpha); // Use the computed alpha value for final color
}
`;

type EyeFloatersEffectProps = {
    textureUrl: string;
    particle_count: number;
    particle_transparency: number;
    particle_size: number;
    particle_color: number;
}

type UniformType = Uniform<number> | Uniform<Vector2> | Uniform<Texture>;

export default class EyeFloatersEffectImpl extends Effect {
    constructor({ 
        textureUrl, 
        particle_count, 
        particle_transparency,
        particle_size,
        particle_color
     }: EyeFloatersEffectProps) {
        super(
            'EyeFloatersEffect', 
            fragmentShader, 
            {
                uniforms: new Map<string, UniformType>([
                    ['time', new Uniform(0)],
                    ['resolution', new Uniform(new Vector2(window.innerWidth, window.innerHeight))],
                    ['noiseTexture', new Uniform(new TextureLoader().load(textureUrl))],
                    ['particle_count', new Uniform(particle_count)],
                    ['particle_transparency', new Uniform(particle_transparency)],
                    ['particle_size', new Uniform(particle_size)],
                    ['particle_color', new Uniform(particle_color)],
                ]),
            }
        );
    }

    update(_renderer: any, _inputBuffer: any, deltaTime: number): void
    {
        (this.uniforms.get('time') as Uniform<number>).value += deltaTime;
    }

}