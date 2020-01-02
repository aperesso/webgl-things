varying vec3 vnoise;

void main() {
    gl_FragColor = vec4(vnoise, 1.0);
}