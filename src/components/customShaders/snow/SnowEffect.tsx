import { Effect } from 'postprocessing';
import { Uniform } from 'three';
import { Texture } from 'three/src/textures/Texture';

const fragShader = `
    uniform float strength;
    uniform bool enabled;
    uniform float u_time; // Time uniform to change the randomness over time

    // Function to generate random numbers
    float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        // Use time and uv to generate a random number
        float randomValue = rand(uv + u_time);
    
        // 1 in 40 chance (2.5%)
        if (randomValue < 0.025) {
            // Random alpha value between 0 and 1
            float randomAlpha = rand(uv * u_time);
            outputColor = vec4(1.0, 1.0, 1.0, randomAlpha * 0.01);
        } else {
            outputColor = inputColor;
        }
    }
`;

type UniformType = Uniform<Texture | null> | Uniform<number> | Uniform<boolean>;

class SnowEffect extends Effect {
  constructor({ enabled = false, strength = 0.96 } = {}) {

    super(
      'SnowEffect', 
      fragShader,
      {
        uniforms: new Map<string, UniformType>([
          ['strength', new Uniform(strength)],
          ['enabled', new Uniform(enabled)],
          ['u_time', new Uniform(0.0)],
        ]),
      },
    );
  }

  update(_renderer: any, _inputBuffer: any, deltaTime: number): void
    {
        (this.uniforms.get('u_time') as Uniform<number>).value += deltaTime;
    }
}

export default SnowEffect;

