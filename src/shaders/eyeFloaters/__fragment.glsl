void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    uv.x *= 1.777;
    uv.x -= 0.4;

    vec3 col = vec3(0,0,0); 
    
    #define particle_count 50
    
    for (int i=0;i<particle_count; i++)
    {
        float noise1 = texture( iChannel0 ,  vec2(float(i)					)*0.005).r;
        float noise2 = texture( iChannel0 ,  vec2(float(i)+10.0				)*0.005).r;
        float noise3 = texture( iChannel0 ,  vec2(float(i)		+iTime*0.2	)*0.005).r;;
        float noise4 = texture( iChannel0 ,  vec2(float(i)+10.0	+iTime*0.2	)*0.005).r;;
                
        vec2 particle_pos = 		vec2(0.20) 
            					+ 	vec2(noise1, noise2)*0.5 
            					+ 	vec2(noise3, noise4)*0.05;
        
        float d = distance(uv, particle_pos);
        col += vec3(1,1,1)*(1.0-d*50.0) * float(d < 0.02);

        
    }
    
    // Output to screen
    fragColor = vec4(1.0-col,1.0);
    fragColor.rgb *= vec3(distance(uv, vec2(0.5)) < 0.4);
}