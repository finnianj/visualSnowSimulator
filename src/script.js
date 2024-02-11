import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js'
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

import GUI from 'lil-gui'

import { DisplacementShader } from './shaders/displacement/displacement';

import snowVertexShader from './shaders/snow/vertex.glsl'
import snowFragmentShader from './shaders/snow/fragment.glsl'
import blurVertexShader from './shaders/blur/vertex.glsl'
import blurFragmentShader from './shaders/blur/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// ...
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new TextureLoader()

// Other Parameters
const miscParameters = {}
miscParameters.environmentMap = 3

  /**
 * Environment map
 */
// LDR cube texture
const environmentMap = cubeTextureLoader.load([
  `/environmentMaps/${miscParameters.environmentMap - 1}/px.png`,
  `/environmentMaps/${miscParameters.environmentMap - 1}/nx.png`,
  `/environmentMaps/${miscParameters.environmentMap - 1}/py.png`,
  `/environmentMaps/${miscParameters.environmentMap - 1}/ny.png`,
  `/environmentMaps/${miscParameters.environmentMap - 1}/pz.png`,
  `/environmentMaps/${miscParameters.environmentMap - 1}/nz.png`
])

scene.background = environmentMap

// gui.add(miscParameters, 'environmentMap').name('Environment Map').min(1).max(3).step(1).onFinishChange(generateSnow)
// gui.addColor(snowParameters, 'insideColor').onFinishChange(generateSnow)
// gui.addColor(snowParameters, 'outsideColor').onFinishChange(generateSnow)



/**
 * Sizes
*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -3
camera.position.y = 0.001
camera.position.z = 0.001

scene.add(camera)


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.target.set(0, 0.5, -1)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Post processing
 */
const postProcessingGui = gui.addFolder('Post processing');

const effectComposer = new EffectComposer(renderer)
effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// Create shader pass for afterimage effect
const afterimagePass = new AfterimagePass()
effectComposer.addPass(afterimagePass)
afterimagePass.uniforms.damp.value = 0.9
afterimagePass.enabled = false

// const glitchPass = new GlitchPass()
// effectComposer.addPass(glitchPass)
// glitchPass.goWild = true

// const rgbShiftPass = new ShaderPass(RGBShiftShader)
// effectComposer.addPass(rgbShiftPass)

const filmPass = new FilmPass( 2.35 )
filmPass.enabled = false
effectComposer.addPass(filmPass)

const unrealBloomPass = new UnrealBloomPass()
unrealBloomPass.enabled = false
effectComposer.addPass(unrealBloomPass)
unrealBloomPass.strength = 0.3
unrealBloomPass.radius = 1
unrealBloomPass.threshold = 0.6

const effectHBlur = new ShaderPass( HorizontalBlurShader );
const effectVBlur = new ShaderPass( VerticalBlurShader );
effectHBlur.uniforms[ 'h' ].value = 0 / ( sizes.width / 2 );
effectVBlur.uniforms[ 'v' ].value = 0 / ( sizes.height / 2 );
effectComposer.addPass(effectHBlur);
effectComposer.addPass(effectVBlur);

// const renderPixelatedPass = new RenderPixelatedPass( 50, scene, camera );
// 			effectComposer.addPass( renderPixelatedPass );

// const displacementPass = new ShaderPass(DisplacementShader)
// displacementPass.material.uniforms.uTime.value = 0
// displacementPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png')
// effectComposer.addPass(displacementPass)

const blur = postProcessingGui.addFolder('Blur')
const filmGrain = postProcessingGui.addFolder('Film Grain')
const bloom = postProcessingGui.addFolder('Bloom')
const afterimages = postProcessingGui.addFolder('Afterimages')


afterimages.add(afterimagePass, 'enabled').name('Afterimages enabled')
afterimages.add(afterimagePass.uniforms.damp, 'value').name('Afterimages damp').min(0).max(1).step(0.01)

blur.add(effectHBlur, 'enabled').name('Horizontal Blur enabled')
blur.add(effectHBlur.uniforms[ 'h' ], 'value').name('Horizontal Blur').min(0).max(0.01).step(0.0001)
blur.add(effectVBlur, 'enabled').name('Vertical Blur enabled')
blur.add(effectVBlur.uniforms[ 'v' ], 'value').name('Vertical Blur').min(0).max(0.01).step(0.0001)

filmGrain.add(filmPass, 'enabled').name('Film Grain enabled')

bloom.add(unrealBloomPass, 'enabled').name('Bloom enabled')
bloom.add(unrealBloomPass, 'strength').name('Bloom strength').min(0).max(2).step(0.001)
bloom.add(unrealBloomPass, 'radius').name('Bloom radius').min(0).max(2).step(0.001)
bloom.add(unrealBloomPass, 'threshold').name('Bloom threshold').min(0).max(1).step(0.001)

// Gamma correction
const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionPass)

gui.close()


// Create shader pass for custom shader
const customShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;

    void main()
    {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;

    varying vec2 vUv;

    void main() {
      // Define the initial position and radius of the circular blob
      vec2 center = vec2(0.5, 0.5);
      float radius = 0.05;

      // Calculate the offset for the blob's position based on time
      float speed = 0.1; // Adjust the speed of movement
      float offsetX = sin(uTime * speed) * 0.2; // Adjust the magnitude of movement
      float offsetY = cos(uTime * speed) * 0.2;

      // Calculate the new position of the blob
      vec2 newPosition = center + vec2(offsetX, offsetY);

      // Calculate the distance from the new center to the current fragment
      float dist = distance(newPosition, vUv);

      // Calculate the blur factor based on the distance
      float blurFactor = smoothstep(radius - 0.02, radius + 0.02, dist);


      // Sample the color of the input texture
      vec4 color = texture2D(tDiffuse, vUv);

      // Check if the fragment is outside the circular blob
      if (dist < radius) {
        // Apply a light blur effect
        vec4 blurredColor = mix(color, vec4(1.0), blurFactor); // Light blur
        gl_FragColor = blurredColor;
      } else {
        // Inside the circular blob, render the input texture color
        gl_FragColor = color;
      }
    }
  `,

};

// Create shader material
const customMaterial = new THREE.ShaderMaterial({
  uniforms: customShader.uniforms,
  vertexShader: customShader.vertexShader,
  fragmentShader: customShader.fragmentShader,
});

// Create shader pass
const customPass = new ShaderPass(customMaterial);

// Add pass to composer after other passes
effectComposer.addPass(customPass);





/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // // Update snow material
    // if( material)
    // {
    //     material.uniforms.uTime.value = elapsedTime
    // }
    customShader.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    effectComposer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
