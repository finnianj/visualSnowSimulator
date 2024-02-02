uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;

    const int kernelSize = 15; // Adjust the kernel size for the blur
    const float blurAmount = 0.02; // Adjust the blur amount
    const float brightness = 1.2; // Adjust the brightness compensation factor

    void main() {
      vec2 texelSize = 1.0 / resolution;
      vec4 color = vec4(0.0);

      for (int i = -kernelSize; i <= kernelSize; i++) {
        vec2 offset = vec2(float(i)) * texelSize * blurAmount;
        color += texture2D(tDiffuse, vUv + offset);
      }

      color /= float(2 * kernelSize + 1); // Normalize by kernel size
      color *= brightness; // Apply brightness compensation

      gl_FragColor = color;
    }
