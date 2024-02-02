uniform sampler2D tDiffuse;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  vec4 sum = vec4(0.0);

  for (int x = -5; x <= 5; x++) {
    for (int y = -5; y <= 5; y++) {
      vec2 offset = vec2(float(x), float(y)) / resolution;
      sum += texture2D(tDiffuse, vUv + offset);
    }
  }

  gl_FragColor = sum / 121.0; // Adjust the divisor for the blur intensity
}
