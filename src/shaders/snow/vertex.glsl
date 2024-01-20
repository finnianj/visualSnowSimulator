uniform float uTime;
uniform float uSize;
uniform float uSpeed; // Speed of particle movement (adjust as needed)

attribute float aScale;
attribute vec3 aOffset; // Random offsets for each particle
varying vec3 vColor;

void main() {
    // Calculate animation factor based on uTime
    float animationFactor = sin(uTime) * 0.5 + 0.5; // Adjust the frequency and amplitude as needed

    // Apply animation factor to the offset
    vec3 offset = aOffset * animationFactor * uSpeed;

    vec4 modelPosition = modelMatrix * vec4(position + offset, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;

    vColor = color;
}
