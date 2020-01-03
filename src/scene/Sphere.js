import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { SPHERE_SETTINGS , LIGHT_SETTINGS } from '../settings';
import { loadShaders , loadFile } from '../utils';

const Sphere = function() {
  this.mesh = null;
}

Sphere.prototype.setMesh = async function() {
  const { radius, segments , noiseScale, noiseFrequency, noiseOffset , material } = SPHERE_SETTINGS;

  const geometry = new THREE.SphereBufferGeometry(radius, segments, segments);
  BufferGeometryUtils.computeTangents(geometry);

  const uniforms =  THREE.UniformsUtils.merge([
    THREE.UniformsLib.light,
    THREE.UniformsLib.fog,
    {
        lightPosition: {type: 'v3', value: new THREE.Vector3(700, 700, 700)},
        time: {type: 'f', value: 0},
        uNoiseScale : { value : noiseScale },
        uNoiseFrequency : { value : noiseFrequency },
        uNoiseOffset : { value : noiseOffset },
        uTime : { value : 1.0 },
        uMaterialAmbient : { value : new THREE.Vector3(...material.ambient) },
        uMaterialSpecular : { value : new THREE.Vector3(...material.specular) },
        uMaterialDiffuse : { value : new THREE.Vector3(...material.diffuse) },
        uMaterialShininess : { value : material.shininess },
        uLightAmbient : { value : new THREE.Vector3(...LIGHT_SETTINGS.ambient) },
        uLightDiffuse : { value : new THREE.Vector3(...LIGHT_SETTINGS.diffuse) },
        uLightSpecular : { value : new THREE.Vector3(...LIGHT_SETTINGS.specular) },
        uLightPosition : { value : LIGHT_SETTINGS.position }
    }
  ])

  const shaders = await loadShaders('sphere');
  const sphereMaterial = new THREE.ShaderMaterial({
    uniforms,
    ...shaders
  });

  const depthShader = await loadFile(`${process.env.PUBLIC_URL}/shaders/sphere/depthShader.glsl`)

  this.mesh = new THREE.Mesh(geometry, sphereMaterial);
  this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
    uniforms,   
    vertexShader: depthShader,
    fragmentShader: THREE.ShaderLib.shadow.fragmentShader,
  });
  this.mesh.castShadow = true;
}

Sphere.prototype.animate = function() {
  if (this.mesh === null) return;
  this.mesh.material.uniforms["uTime"].value += 0.01;
}

export default Sphere;