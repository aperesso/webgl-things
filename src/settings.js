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
  radius : 8,
  segments : 500,
  noiseScale : 0.7,
  noiseFrequency : 0.47,
  noiseOffset : new THREE.Vector3(0.2, 0.2, 0.2),
  materialAmbient : "#070707",
  materialSpecular : "#593232",
  materialDiffuse : "#9d9d9d",
  materialShininess : 64, 
  
}

const GUI_SPHERE_SETTINGS = {
  noise : {
    noiseScale : {
      type : 'range',
      range : [0, 20]
    },
    noiseFrequency : {
      type : 'range',
      range : [0, 1],
    },
  },
  material : {
    materialShininess : {
      type : 'range',
      range : [16, 64]
    },
    materialAmbient : {
      type : 'color'
    },
    materialDiffuse : {
      type : 'color'
    },
    materialSpecular : {
      type : 'color'
    }
  },
  
}

const BACKGROUND_SETTINGS = {
  color :  0x101010,
  height : 1000,
  width : 1000,
  segments : 1
}

const BLOOM_SETTINGS = {
  exposure: 1,
  bloomStrength: 0.5,
  bloomThreshold: 0.3,
  bloomRadius: 0.1
}

const GUI_BLOOM_SETTINGS = {
  exposure : { 
    type : 'range',
    range : [0.1, 2],
  },
  bloomStrength : {
    type : 'range',
    range : [0, .5],
  }, 
  bloomThreshold : {
    type : 'range',
    range : [0, .5],
  },
  bloomRadius : {
    type : 'range',
    range : [0, .5],
  }
}

export {
  CAMERA_SETTINGS,
  SPHERE_SETTINGS,
  BACKGROUND_SETTINGS,
  LIGHT_SETTINGS,
  GUI_SPHERE_SETTINGS,
  BLOOM_SETTINGS,
  GUI_BLOOM_SETTINGS,
}