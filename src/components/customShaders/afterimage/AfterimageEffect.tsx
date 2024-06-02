import { Effect } from 'postprocessing';
import { Uniform, WebGLRenderTarget, HalfFloatType, NearestFilter, ShaderMaterial } from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass';
import { Texture } from 'three/src/textures/Texture';

const outputShader = `
  uniform sampler2D tFinal;
  uniform bool enabled;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
  {
    if (!enabled) {
      outputColor = inputColor;
      return;
    }
    vec4 finalColor = texture2D(tFinal, uv);
    outputColor = finalColor;
  }
`;

const frameBlendShader = {
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */`
    uniform float damp;
    uniform sampler2D tOld;
    uniform sampler2D tNew;
    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    vec4 when_gt(vec4 x, float y) {
      return max(sign(x - y), 0.0);
    }

    void main()
    {
      vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);
    }
  `
};

type UniformType = Uniform<Texture | null> | Uniform<number> | Uniform<boolean>;

class AfterimageEffect extends Effect {
  compTexture: WebGLRenderTarget;
  oldTexture: WebGLRenderTarget;
  compFsMaterial: ShaderMaterial;
  compFsQuad: FullScreenQuad;
  shader: { vertexShader: string; fragmentShader: string; };

  constructor({ enabled = false, damp = 0.96 } = {}) {

    super(
      'AfterimageEffect', 
      outputShader,
      {
        uniforms: new Map<string, UniformType>([
          ['damp', new Uniform(damp)],
          ['tOld', new Uniform(null)],
          ['tNew', new Uniform(null)],
          ['tFinal', new Uniform(null)],
          ['enabled', new Uniform(enabled)],
        ]),
      },
    );

    this.shader = frameBlendShader;

    this.compTexture = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {
      magFilter: NearestFilter,
      type: HalfFloatType
    } );

    this.oldTexture = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {
      magFilter: NearestFilter,
      type: HalfFloatType
    } );

    this.compFsMaterial = new ShaderMaterial( {
      uniforms: Object.fromEntries(this.uniforms),
      vertexShader: this.shader.vertexShader,
      fragmentShader: this.shader.fragmentShader
    } );

    this.compFsQuad = new FullScreenQuad( this.compFsMaterial );
  }

  update(renderer: any, inputBuffer: WebGLRenderTarget, deltaTime?: number) {
    if (this.uniforms.get('enabled')?.value === false) return;
    // Set uniforms
    (this.uniforms.get('tOld') as Uniform<Texture>).value = this.oldTexture.texture;
    (this.uniforms.get('tNew') as Uniform<Texture>).value = inputBuffer.texture;

    // Render a blended composite frame into compTexture
    renderer.setRenderTarget(this.compTexture);
    this.compFsQuad.render( renderer );
    renderer.setRenderTarget(null);

    // Set final output texture
    (this.uniforms.get('tFinal') as Uniform<Texture>).value = this.compTexture.texture;

    // Swap textures
    const temp = this.oldTexture;
    this.oldTexture = this.compTexture;
    this.compTexture = temp;
  }

  setSize(width: number, height: number): void {
    this.compTexture.setSize(width, height);
    this.oldTexture.setSize(width, height);
  }

}

export default AfterimageEffect;

