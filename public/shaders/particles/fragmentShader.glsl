uniform sampler2D pointTexture;
uniform float opacity;

varying float average;

void main() {

    vec3    colorA = vec3(.3, .3, .3);
    vec3    colorB = vec3(1., 1., 1.);
    vec3    color = mix(colorA, colorB, max(average, 0.2));
    vec4 tex = texture2D( pointTexture, gl_PointCoord );
    
    color = mix(
        color, 
        tex.xyz,
        0.5
    );
    gl_FragColor = opacity * vec4(color, tex.a);
}