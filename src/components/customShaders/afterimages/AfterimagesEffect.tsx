import { Effect } from 'postprocessing';
import { Texture, Uniform, WebGLRenderTarget, WebGLRenderer } from 'three';
import { Vector2 } from 'three';

const fragmentShader = `
uniform bool enabled;
uniform sampler2D currentFrame;
uniform vec2 resolution;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    if (!enabled) {
        outputColor = inputColor;
        return;
    }

    vec2 texelSize = 1.0 / resolution;
    vec3 currentColour = texture2D(currentFrame, uv).rgb;

    // Sobel edge detection
    float sobelX = -1.0 * texture2D(currentFrame, uv + texelSize * vec2(-1, -1)).r +
                    -2.0 * texture2D(currentFrame, uv + texelSize * vec2(-1,  0)).r +
                    -1.0 * texture2D(currentFrame, uv + texelSize * vec2(-1,  1)).r +
                     1.0 * texture2D(currentFrame, uv + texelSize * vec2( 1, -1)).r +
                     2.0 * texture2D(currentFrame, uv + texelSize * vec2( 1,  0)).r +
                     1.0 * texture2D(currentFrame, uv + texelSize * vec2( 1,  1)).r;

    float sobelY = -1.0 * texture2D(currentFrame, uv + texelSize * vec2(-1, -1)).r +
                    -2.0 * texture2D(currentFrame, uv + texelSize * vec2( 0, -1)).r +
                    -1.0 * texture2D(currentFrame, uv + texelSize * vec2( 1, -1)).r +
                     1.0 * texture2D(currentFrame, uv + texelSize * vec2(-1,  1)).r +
                     2.0 * texture2D(currentFrame, uv + texelSize * vec2( 0,  1)).r +
                     1.0 * texture2D(currentFrame, uv + texelSize * vec2( 1,  1)).r;

    float edge = sqrt(sobelX * sobelX + sobelY * sobelY);

    // Threshold for edge detection
    float threshold = 0.5;
    float edgeMask = smoothstep(threshold - 0.01, threshold + 0.01, edge);

    // Apply an offset to create a line outward from the edges
    float offsetDistance = 2.0; // Distance to offset the white line
    vec3 haloColor = vec3(1.0); // White halo color

    // Initialize the blended color to the current color
    vec3 blendedColour = currentColour;

    // Sample around the current pixel to find the edge and apply the offset
    for (float x = -1.0; x <= 1.0; x++) {
        for (float y = -1.0; y <= 1.0; y++) {
            vec2 offset = texelSize * vec2(x * offsetDistance, y * offsetDistance);
            float sampleEdge = texture2D(currentFrame, uv + offset).r;
            if (sampleEdge > threshold) {
                blendedColour = haloColor;
            }
        }
    }

    outputColor = vec4(blendedColour, 1.0);
}


`

type AfterimagesEffectProps = {
    enabled: boolean;
}

type UniformType = any

export default class AfterimagesEffect extends Effect {
    constructor({ enabled }: AfterimagesEffectProps) {
        super(
            'AfterimagesEffect',
            fragmentShader,
            {
                uniforms: new Map<string, UniformType>([
                    ['enabled', new Uniform(enabled)],
                    ['currentFrame', new Uniform(null)],
                    ['resolution', new Uniform(new Vector2(window.innerWidth, window.innerHeight))]
                ]),
            }
        );
    }

    
    onResize(): void {
        (this.uniforms.get('resolution') as Uniform<Vector2>).value.set(window.innerWidth, window.innerHeight);
    }

    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget<Texture>, deltaTime?: number | undefined): void {
        this.uniforms.get('currentFrame')!.value = inputBuffer.texture;
    }
  
}

