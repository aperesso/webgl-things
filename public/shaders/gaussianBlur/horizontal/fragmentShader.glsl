uniform sampler2D tDiffuse;
uniform sampler2D map;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
 
    vec4 color = vec4(0.0);
    float pixelSize = 1.0/resolution.x;

    color += texture2D(tDiffuse, vec2(vUv.x - pixelSize * 5.0, vUv.y)) * 0.0093;
    color += texture2D(tDiffuse, vec2(vUv.x - pixelSize * 4.0, vUv.y)) * 0.028002;
    color += texture2D(tDiffuse, vec2(vUv.x - pixelSize * 3.0, vUv.y)) * 0.065984;
    color += texture2D(tDiffuse, vec2(vUv.x - pixelSize * 2.0, vUv.y)) * 0.121703;
    color += texture2D(tDiffuse, vec2(vUv.x - pixelSize * 1.0, vUv.y)) * 0.175713;
    color += texture2D(tDiffuse, vec2(vUv.x, vUv.y)) * 0.198596;
    color += texture2D(tDiffuse, vec2(vUv.x + pixelSize * 1.0, vUv.y)) * 0.175713;
    color += texture2D(tDiffuse, vec2(vUv.x + pixelSize * 2.0, vUv.y)) * 0.121703;
    color += texture2D(tDiffuse, vec2(vUv.x + pixelSize * 3.0, vUv.y)) * 0.065984;
    color += texture2D(tDiffuse, vec2(vUv.x + pixelSize * 4.0, vUv.y)) * 0.028002;
    color += texture2D(tDiffuse, vec2(vUv.x + pixelSize * 5.0, vUv.y)) * 0.0093;
    gl_FragColor = vec4(color);

}
