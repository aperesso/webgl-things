import * as THREE from 'three';

import { SPHERE_SETTINGS } from '../settings';


const Sphere = function() {
  const { radius, segments , color } = SPHERE_SETTINGS;

  const geometry = new THREE.SphereBufferGeometry(radius, segments, segments);
  const material = new THREE.MeshPhongMaterial({color});
  material.color.convertSRGBToLinear();

  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.castShadow = true;
}


export default Sphere;