

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
    // scene.add(points)
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
snowGui.add(snowParameters, 'allowPerspectiveScaling').name('Allow Perspective Scaling').onFinishChange(generateSnow)
