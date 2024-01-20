uniform float uTime; // Time uniform

varying vec3 vColor;

void main()
{

     // Disc
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = step(0.5, strength);
    // strength = 1.0 - strength;

    // Diffuse point
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength *= 2.0;
    // strength = 1.0 - strength;

     // Calculate a time-dependent factor for brightness oscillation
    float oscillation = 0.5 + 0.5 * sin(uTime); // Adjust the frequency and amplitude as needed

     // Calculate strength based on oscillation
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 50.0);
    strength *= oscillation; // Apply oscillation factor to brightness


    // // Light point
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - strength;
    // strength = pow(strength, 50.0);

    // Final color
    vec3 color = mix(vec3(0.0), vColor, strength);
    // gl_FragColor = vec4(vec3(strength), 1.0);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}
