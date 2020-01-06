import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { SPHERE_SETTINGS , LIGHT_SETTINGS } from '../settings';
import { loadShaders , loadFile } from '../utils';

const Sphere = function() {
  this.mesh = null;
  this.audio = null;
}

Sphere.prototype.setMesh = async function(audio) {

  const geometry = new THREE.SphereBufferGeometry(
    SPHERE_SETTINGS.radius,
    SPHERE_SETTINGS.segments,
    SPHERE_SETTINGS.segments
  );

  this.audio = audio;

  BufferGeometryUtils.computeTangents(geometry); 

  console.log(this.audio.audioBandsBuffer)
  this.sphereUniforms = {
    uAudioBandsBuffer : { value : this.audio.audioBandsBuffer},
    uAudioBands : { value : [0] },
    uNoiseScale : { value : SPHERE_SETTINGS.noiseScale },
    uNoiseFrequency : { value : SPHERE_SETTINGS.noiseFrequency },
    uNoiseOffset : { value : SPHERE_SETTINGS.noiseOffset },
    uTime : { value : 1.0 },
    uMaterialAmbient : { value : new THREE.Color(SPHERE_SETTINGS.materialAmbient)},
    uMaterialSpecular : { value : new THREE.Color(SPHERE_SETTINGS.materialSpecular) },
    uMaterialDiffuse : { value : new THREE.Color(SPHERE_SETTINGS.materialDiffuse)},
    uMaterialShininess : { value : SPHERE_SETTINGS.materialShininess },
    uLightAmbient : { value : new THREE.Vector3(...LIGHT_SETTINGS.ambient) },
    uLightDiffuse : { value : new THREE.Vector3(...LIGHT_SETTINGS.diffuse) },
    uLightSpecular : { value : new THREE.Vector3(...LIGHT_SETTINGS.specular) },
    uLightPosition : { value : LIGHT_SETTINGS.position }
  }

  const uniforms =  THREE.UniformsUtils.merge([
    THREE.UniformsLib.light,
    THREE.UniformsLib.fog,
    this.sphereUniforms
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
  this.mesh.material.uniforms["uTime"].value += 0.0001;
  this.mesh.material.uniforms["uNoiseOffset"].value.x += 0.03;
  this.mesh.material.uniforms["uNoiseOffset"].value.y += 0.03;
  this.mesh.material.uniforms["uNoiseOffset"].value.z += 0.03;

  this.mesh.material.uniforms["uAudioBandsBuffer"].value = this.audio.audioBandsBuffer;


  // this.mesh.rotation.y += 0.01;

  //console.log(this.audio);
}

export default Sphere;