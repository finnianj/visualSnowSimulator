uniform float uTime;
uniform float uSize;
uniform float uSpeed; // Speed of particle movement (adjust as needed)
uniform float uMaxDistance; // Maximum distance a particle can move
uniform bool uAllowPerspectiveScaling; // Whether to scale particles based on perspective


attribute float aScale;
attribute vec3 aOffset; // Random offsets for each particle
varying vec3 vColor;

void main() {
     // Calculate a unique seed for each particle
    float seed = float(gl_VertexID);

    // Calculate animation factor based on uTime and particle-specific seed
    float animationFactor = mod(uTime * uSpeed + seed * 0.123, 1.0);

    // Calculate random offsets based on animationFactor
    vec3 offset = vec3(
        (fract(sin(animationFactor * 753.5453123) * 43758.5453) - 0.5) * uSpeed * uMaxDistance,
        (fract(cos(animationFactor * 435.9823987) * 78432.9384) - 0.5) * uSpeed * uMaxDistance,
        (fract(sin(animationFactor * 239.8279874) * 83984.7398) - 0.5) * uSpeed * uMaxDistance
    );

    vec4 modelPosition = modelMatrix * vec4(position + offset, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // If statement for uniform boolean uAllowPerspectiveScaling
    if (uAllowPerspectiveScaling) {
      gl_PointSize = uSize * aScale;
    } else {
      gl_PointSize = uSize;
    }

    vColor = color;
}