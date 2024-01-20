import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import snowVertexShader from './shaders/snow/vertex.glsl'
import snowFragmentShader from './shaders/snow/fragment.glsl'
import GUI from 'lil-gui'

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
 * Snow
 */
const parameters = {}
parameters.density = 200000
parameters.size = 0.005
parameters.radius = 5
parameters.spin = 1
parameters.insideColor = '#ffffff'
parameters.outsideColor = '#ffffff'

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
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.density * 3)
    const colors = new Float32Array(parameters.density * 3)
    const scales = new Float32Array(parameters.density * 1)

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

        positions[i3] = x;
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
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

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
            uSize: { value: 10 * renderer.getPixelRatio() }
          },
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}

gui.add(parameters, 'density').min(100).max(1000000).step(100).onFinishChange(generateSnow)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateSnow)
// gui.addColor(parameters, 'insideColor').onFinishChange(generateSnow)
// gui.addColor(parameters, 'outsideColor').onFinishChange(generateSnow)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0.001
camera.position.y = 0.001
camera.position.z = 0.001
scene.add(camera)

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
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
