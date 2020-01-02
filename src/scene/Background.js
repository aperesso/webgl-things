import * as THREE from 'three';

import { BACKGROUND_SETTINGS } from '../settings'

const Background = function() {

  const { color , height , width , segments } = BACKGROUND_SETTINGS;

  const material = new THREE.MeshPhongMaterial({color});
  material.color.convertSRGBToLinear();

  const geometry = new THREE.PlaneBufferGeometry(width, height, segments, segments);

  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.position.z = -40;
  this.mesh.receiveShadow = true;

}

export default Background;