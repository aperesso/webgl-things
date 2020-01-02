uniform sampler2D tDiffuse;
varying vec2 vUv;


void main() {
    vec4 color =  texture2D( tDiffuse, vUv);
    // vec4 color =  texture2D(tDiffuse, vUv);
    float brightness = color.r*0.2126+ color.g*0.7152 + color.b*0.0722;
    if (brightness > 0.9) {
        gl_FragColor = vec4(color);
    } else {
        gl_FragColor = vec4(0.0);
    }
   
}