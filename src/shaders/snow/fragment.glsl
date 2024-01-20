uniform float uTime; // Time uniform
uniform float uBrightness; // Brightness uniform
uniform float uSoftness; // Softness uniform
varying vec3 vColor;

void main()
{
    // Light point
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    distanceFromCenter = 1.0 - distanceFromCenter;
    distanceFromCenter = pow(distanceFromCenter, 50.0);

    // Calculate the alpha value based on the softness
    float alpha = 1.0; // Default: Hard circle
    alpha = smoothstep(0.5 - uSoftness, 0.5 + uSoftness, distanceFromCenter);


    // Final color
    vec3 color = mix(vec3(0.0), vColor, alpha);

    // gl_FragColor = vec4(vec3(strength), 1.0);
    gl_FragColor = vec4(color, uBrightness);
    #include <colorspace_fragment>
}
