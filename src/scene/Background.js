import * as THREE from 'three';

import { BACKGROUND_SETTINGS } from '../settings'

const Background = function() {

  const { color , height , width , segments } = BACKGROUND_SETTINGS;

  const material = new THREE.MeshLambertMaterial({color});
  material.color.convertSRGBToLinear();

  const geometry = new THREE.PlaneBufferGeometry(width, height, segments, segments);

  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.position.z = -100;
  this.mesh.rotation.x -= Math.PI / 2;
  this.mesh.position.y = -35;
  this.mesh.receiveShadow = true;

}

export default Background;