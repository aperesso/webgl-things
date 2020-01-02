uniform sampler2D tDiffuse;
uniform sampler2D modifiedTexture;
varying vec2 vUv;

vec4 getTexture( sampler2D texelToLinearTexture ) {
    return mapTexelToLinear( texture2D( texelToLinearTexture , vUv ) );
}
void main() {
    vec4 diffuse = getTexture(tDiffuse);
    vec4 modifiedTexture = getTexture(modifiedTexture);
    gl_FragColor = diffuse + 0.05 * modifiedTexture;
}