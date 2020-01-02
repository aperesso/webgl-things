attribute vec3 noise;

varying vec3 vnoise;

void main() {
  vnoise = noise;
  gl_PointSize = 9.;
  gl_Position = projectionMatrix 
    * modelViewMatrix * vec4( position , 1.0);
}