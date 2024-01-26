uniform float uTime; // Time uniform
uniform float uBrightness; // Brightness uniform
uniform float uSoftness; // Softness uniform
uniform float uSize; // Size uniform
varying vec3 vColor;

void main()
{
    // Light point
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    // Inverts values so center is 1.0, edge is 0.5
    distanceFromCenter = 1.0 - distanceFromCenter;
    // Makes edges equivalent to 0 and creates a gradual fade by raising values
    distanceFromCenter = pow(distanceFromCenter, 10.0);

    // At this point you have a gradual fade which you can use as the alpha value
    // vec3 color = mix(vec3(0.0), vColor, distanceFromCenter);

    // Or calculate the alpha value based on the softness using smoothstep
    float alpha = distanceFromCenter;
    alpha = smoothstep(0.01, 0.01 + uSoftness, distanceFromCenter);

    // Final color
    vec3 color = mix(vec3(0.0), vColor, alpha);

    // gl_FragColor = vec4(vec3(strength), 1.0);
    gl_FragColor = vec4(color, uBrightness);
    #include <colorspace_fragment>
}
