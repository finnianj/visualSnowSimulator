precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
varying vec2 vUv;
uniform vec2 uResolution;

vec4 Sphere(vec2 position, float radius)
{
    // float dist = radius / distance(vUv, position);
    // float strength = 0.01 / distance(vUv, position);
    float strength = 0.1 / distance(vec2(vUv.x, (vUv.y - 0.5) * 8. + 0.5), vec2(0.));
    return vec4(strength * strength);
}

void main()
{
    vec2 uv = vUv;

    vec4 pixel = vec4(0.0, 0.0, 0.0, 0.0);

    vec2 positions[4];
    positions[0] = vec2(.5, .5);
    // positions[1] = vec2(sin(uTime * 3.0) * 0.5, (cos(uTime * 1.3) * 0.6) + vUv.y);
    // positions[2] = vec2(sin(uTime * 2.1) * 0.1, (cos(uTime * 1.9) * 0.8) + vUv.y);
    // positions[3] = vec2(sin(uTime * 1.1) * 1.1, (cos(uTime * 2.6) * 0.7) + vUv.y);

    for (int i = 0; i < 2; i++)
        pixel += Sphere(positions[i], 0.22);

    pixel = pixel * pixel;
    gl_FragColor = pixel;
}
