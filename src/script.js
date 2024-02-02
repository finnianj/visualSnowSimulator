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
 * Snow
 */
const snowParameters = {}
snowParameters.density = 10000
// snowParameters.density = 20000
snowParameters.size = 3
snowParameters.softness = 0.25
snowParameters.brightness = 1
snowParameters.radius = 0.2
// snowParameters.radius = 5
snowParameters.spin = 1
snowParameters.insideColor = '#ffffff'
snowParameters.outsideColor = '#ffffff'
snowParameters.speed = 0.1
// snowParameters.speed = 0.01
snowParameters.maxDistance = 10
snowParameters.allowPerspectiveScaling = false
snowParameters.enabled = false

let geometry = null
let material = null
let points = null

const generateSnow = () =>
{
    if(points !== null)
    {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

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

    if (!snowParameters.enabled) return

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(snowParameters.density * 3)
    const colors = new Float32Array(snowParameters.density * 3)
    const scales = new Float32Array(snowParameters.density * 1)
    const offsets = new Float32Array(snowParameters.density * 3)


    const insideColor = new THREE.Color(snowParameters.insideColor)
    const outsideColor = new THREE.Color(snowParameters.outsideColor)

    for(let i = 0; i < snowParameters.density; i++)
    {
        const i3 = i * 3

        // Generate random spherical coordinates (uniformly distributed)
        const u = Math.random(); // Uniform random value between 0 and 1
        const v = Math.random(); // Uniform random value between 0 and 1

        const theta = 2 * Math.PI * u; // Azimuthal angle
        const phi = Math.acos(2 * v - 1); // Polar angle (from -1 to 1, then acos to get 0 to pi)

        const radius = snowParameters.radius;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions[i3    ] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        // Color
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / snowParameters.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        // Scale
        scales[i] = Math.random()

        // Offsets
        offsets[i3    ] = Math.random()
        offsets[i3 + 1] = Math.random()
        offsets[i3 + 2] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 3));

    /**
     * Material
     */
    material = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: snowVertexShader,
        fragmentShader: snowFragmentShader,
        uniforms:
          {
            uTime: { value: 0 },
            uSize: { value: snowParameters.size },
            uSoftness: { value: snowParameters.softness },
            uBrightness: { value: snowParameters.brightness },
            uSpeed: { value: snowParameters.speed * 0.01 },
            uMaxDistance: { value: snowParameters.maxDistance },
            uAllowPerspectiveScaling: { value: snowParameters.allowPerspectiveScaling },
          },
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}

const snowGui = gui.addFolder('Snow')

snowGui.add(snowParameters, 'enabled').name('Snow Enabled').onFinishChange(generateSnow)
snowGui.add(snowParameters, 'density').name('Snow Density').min(100).max(1000000).step(100).onFinishChange(generateSnow)
snowGui.add(snowParameters, 'size').name('Snow Size').min(1).max(250).step(1).onFinishChange(generateSnow)
snowGui.add(snowParameters, 'softness').name('Snow Softness').min(0).max(0.5).step(0.01).onFinishChange(generateSnow)
snowGui.add(snowParameters, 'radius').name('Snow Sphere Radius').min(0.2).max(20).step(0.01).onFinishChange(generateSnow)
snowGui.add(snowParameters, 'brightness').name('Snow Brightness').min(0).max(1).step(0.01).onFinishChange(generateSnow)
snowGui.add(snowParameters, 'speed').name('Shake Speed').min(0).max(1).step(0.001).onFinishChange(generateSnow)
snowGui.add(snowParameters, 'maxDistance').name('Shake Area').min(0).max(5000).step(0.1).onFinishChange(generateSnow)

gui.add(miscParameters, 'environmentMap').name('Environment Map').min(1).max(3).step(1).onFinishChange(generateSnow)
gui.add(snowParameters, 'allowPerspectiveScaling').name('Allow Perspective Scaling').onFinishChange(generateSnow)
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
camera.position.x = 0.001
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

// const dotScreenPass = new DotScreenPass()
// effectComposer.addPass(dotScreenPass)


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

generateSnow()


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update snow material
    if(material)
    {
        material.uniforms.uTime.value = elapsedTime
    }

    // Update passes
    // displacementPass.material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    effectComposer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
