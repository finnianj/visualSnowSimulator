// TODO - In this file, rework the AfterimagePass.js to be compatible wtih postprocessing EffectComposer
import { Effect } from 'postprocessing';
import { Uniform, WebGLRenderTarget, HalfFloatType, NearestFilter, ShaderMaterial, Vector2, MeshBasicMaterial } from 'three';
import { FullScreenQuad } from './Pass';

const AfterimageShader = {
  name: 'AfterimageShader',

  uniforms: {
    'damp': { value: 0.96 },
    'tOld': { value: null },
    'tNew': { value: null }
  },

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

    varying vec2 vUv;

    vec4 when_gt(vec4 x, float y) {
      return max(sign(x - y), 0.0);
    }

    void main() {
      vec4 texelOld = texture2D(tOld, vUv);
      vec4 texelNew = texture2D(tNew, vUv);

      texelOld *= damp * when_gt(texelOld, 0.1);

      gl_FragColor = max(texelNew, texelOld);
    }
    
  `
};

class AdaptedAfterimageEffect extends Effect {
  private shader: { vertexShader: string; fragmentShader: string; };
  private textureOld: WebGLRenderTarget;
  private textureComp: WebGLRenderTarget;
  private compFsMaterial: ShaderMaterial;
  private compFsQuad: FullScreenQuad;
  private copyFsQuad: FullScreenQuad;
  private copyFsMaterial: MeshBasicMaterial;

  constructor({ damp = 0.96 } = {}) {
    super(
      'AdaptedAfterimageEffect', 
      AfterimageShader.fragmentShader,
      {
        uniforms: new Map<string, any>([
          ['tOld', new Uniform(null)],
          ['tNew', new Uniform(null)],
          ['damp', new Uniform(damp)]
        ]),
        vertexShader: AfterimageShader.vertexShader,
      }
    );

    this.shader = AfterimageShader;

    this.textureComp = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {
      magFilter: NearestFilter,
      type: HalfFloatType
    } );

    this.textureOld = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {
      magFilter: NearestFilter,
      type: HalfFloatType
    } );

    this.compFsMaterial = new ShaderMaterial( {
      uniforms: this.uniforms as any,
      vertexShader: this.shader.vertexShader,
      fragmentShader: this.shader.fragmentShader
    } );

    this.compFsQuad = new FullScreenQuad( this.compFsMaterial );

		this.copyFsMaterial = new MeshBasicMaterial();
		this.copyFsQuad = new FullScreenQuad( this.copyFsMaterial );
  }

  setSize(width: number, height: number) {
    this.textureComp.setSize(width, height);
    this.textureOld.setSize(width, height);
  }

  dispose() {
    this.textureComp.dispose();
    this.textureOld.dispose();
    this.compFsMaterial.dispose();
    this.copyFsMaterial.dispose();
    this.compFsQuad.dispose();
    this.copyFsQuad.dispose();
  }

  update(renderer: any, inputBuffer: WebGLRenderTarget, deltaTime?: number) {
    this.uniforms.get('tOld')!.value = this.textureComp.texture;
    this.uniforms.get('tNew')!.value = inputBuffer.texture;

    // Render the composite shader to the textureComp target
    renderer.setRenderTarget(this.textureComp);
    this.compFsQuad.render(renderer);

    // Render the composite texture to the screen or write buffer
    this.copyFsQuad.material.map = this.textureComp.texture;

    renderer.setRenderTarget(null);
    this.copyFsQuad.render(renderer);

    // Swap buffers
    const temp = this.textureOld;
    this.textureOld = this.textureComp;
    this.textureComp = temp;
  }
}

export default AdaptedAfterimageEffect;
