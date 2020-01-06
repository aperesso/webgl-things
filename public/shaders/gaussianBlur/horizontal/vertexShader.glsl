varying vec2 vUv;

uniform float uAudioBandsBuffer[8];

varying float average;

void main() {

    average = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2] + uAudioBandsBuffer[3] +
        uAudioBandsBuffer[4] + uAudioBandsBuffer[5] + uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 8.0;

    vUv = uv;
    gl_Position = projectionMatrix 
        * modelViewMatrix * vec4( position, 1.0);

}