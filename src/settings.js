import * as THREE from 'three';

const CAMERA_SETTINGS = {
  fov : 75,
  near : 0.1,
  far : 1000,
}

const LIGHT_SETTINGS = {
  ambient : [0.4,0.4,0.4],
  ambientIntensity : 0.5,
  diffuse : [.8,.8,.8],
  diffuseIntensity : 0.8,
  specular : [1.0,1.0,1.0],
  position : new THREE.Vector3(3, 12, 20),
}

const SPHERE_SETTINGS = {
  radius : 10,
  segments : 100,
  color : 0xfafafa,
  noiseScale : 10.5,
  noiseFrequency : 1.6,
  noiseOffset : new THREE.Vector3(0.2, 0.2, 0.2),
  material : {
    ambient : [196/255,0/255, 0/255],
    specular : [.3,.3,.3],
    diffuse : [196/255,0/255, 0/255],
    shininess : 16,
  }
}

const BACKGROUND_SETTINGS = {
  color :  0x0e0c24,
  height : 1000,
  width : 1000,
  segments : 1
}

export {
  CAMERA_SETTINGS,
  SPHERE_SETTINGS,
  BACKGROUND_SETTINGS,
  LIGHT_SETTINGS,
}