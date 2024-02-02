import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import GUI from 'lil-gui'

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


/**
 * Snow
 */
const parameters = {}
parameters.density = 10000
// parameters.density = 20000
parameters.size = 3
parameters.softness = 0.25
parameters.brightness = 1
parameters.radius = 0.2
// parameters.radius = 5
parameters.spin = 1
parameters.insideColor = '#ffffff'
parameters.outsideColor = '#ffffff'
parameters.speed = 0.1
// parameters.speed = 0.01
parameters.maxDistance = 10
parameters.allowPerspectiveScaling = false
parameters.environmentMap = 3

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
      `/environmentMaps/${parameters.environmentMap - 1}/px.png`,
      `/environmentMaps/${parameters.environmentMap - 1}/nx.png`,
      `/environmentMaps/${parameters.environmentMap - 1}/py.png`,
      `/environmentMaps/${parameters.environmentMap - 1}/ny.png`,
      `/environmentMaps/${parameters.environmentMap - 1}/pz.png`,
      `/environmentMaps/${parameters.environmentMap - 1}/nz.png`
    ])

    scene.background = environmentMap

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.density * 3)
    const colors = new Float32Array(parameters.density * 3)
    const scales = new Float32Array(parameters.density * 1)
    const offsets = new Float32Array(parameters.density * 3)


    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.density; i++)
    {
        const i3 = i * 3

        // Generate random spherical coordinates (uniformly distributed)
        const u = Math.random(); // Uniform random value between 0 and 1
        const v = Math.random(); // Uniform random value between 0 and 1

        const theta = 2 * Math.PI * u; // Azimuthal angle
        const phi = Math.acos(2 * v - 1); // Polar angle (from -1 to 1, then acos to get 0 to pi)

        const radius = parameters.radius;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions[i3    ] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        // Color
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / parameters.radius)

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
            uSize: { value: parameters.size },
            uSoftness: { value: parameters.softness },
            uBrightness: { value: parameters.brightness },
            uSpeed: { value: parameters.speed * 0.01 },
            uMaxDistance: { value: parameters.maxDistance },
            uAllowPerspectiveScaling: { value: parameters.allowPerspectiveScaling },
          },
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}

gui.add(parameters, 'density').name('Snow Density').min(100).max(1000000).step(100).onFinishChange(generateSnow)
gui.add(parameters, 'size').name('Snow Size').min(1).max(250).step(1).onFinishChange(generateSnow)
gui.add(parameters, 'softness').name('Snow Softness').min(0).max(0.5).step(0.01).onFinishChange(generateSnow)
gui.add(parameters, 'radius').name('Snow Sphere Radius').min(0.2).max(20).step(0.01).onFinishChange(generateSnow)
gui.add(parameters, 'brightness').name('Snow Brightness').min(0).max(1).step(0.01).onFinishChange(generateSnow)
gui.add(parameters, 'speed').name('Shake Speed').min(0).max(1).step(0.001).onFinishChange(generateSnow)
gui.add(parameters, 'maxDistance').name('Shake Area').min(0).max(5000).step(0.1).onFinishChange(generateSnow)
gui.add(parameters, 'allowPerspectiveScaling').name('Allow Perspective Scaling').onFinishChange(generateSnow)
gui.add(parameters, 'environmentMap').name('Environment Map').min(1).max(3).step(1).onFinishChange(generateSnow)
// gui.addColor(parameters, 'insideColor').onFinishChange(generateSnow)
// gui.addColor(parameters, 'outsideColor').onFinishChange(generateSnow)


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


const BlurShader = {
  uniforms: {
    uTime : { value: 0.0 },
    uAmplitude: { value: 0.1 },
    uFrequency: { value: 1.0 },
    uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) }
  },
  vertexShader: blurVertexShader,
  fragmentShader: blurFragmentShader
};


/**
 * Post processing
 */
const effectComposer = new EffectComposer(renderer)
effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// const dotScreenPass = new DotScreenPass()
// effectComposer.addPass(dotScreenPass)


generateSnow()


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    effectComposer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
