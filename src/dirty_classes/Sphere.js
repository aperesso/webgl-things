import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import Material from './Material';
import { loadShaders, loadAudio  } from '../utils';

const DEFAULT_SETTINGS = {
    tesselation : 160,
    size : 10,
    noiseScale : 4.27,
    noiseFrequency : 0.5,
    noiseOffset : new THREE.Vector3(0.2, 0.2, 0.2),
}

class Sphere {
    constructor() {
        this.mesh = null;
        this.lights = null;
        this.material = new Material();
        this.uniforms = {
            noiseScale : DEFAULT_SETTINGS.noiseScale,
            noiseFrequency : DEFAULT_SETTINGS.noiseFrequency,
            noiseOffset : DEFAULT_SETTINGS.noiseOffset,
        };
        this.audio = null;
        this.audioAnalyser = null;
    }
}

Sphere.prototype.setLights = function(lights) {
    this.lights = lights
}

Sphere.prototype.setSound = async function() {
    const listener = new THREE.AudioListener();
    this.audio = new THREE.PositionalAudio(listener);
    
    const soundBuffer = await loadAudio('heartbeat.wav');
    this.audio.setBuffer(soundBuffer);
    this.audio.play();
    this.audio.loop = true;
    this.audio.setRefDistance( 0.3 );
    this.audio.setDirectionalCone( 180, 230, 0.1 );
    
    this.audioAnalyser = new THREE.AudioAnalyser(this.audio, 256);
}

Sphere.prototype.initMesh = async function() {
    const {fragmentShader, vertexShader} = await loadShaders('sphere');

    await this.setSound();

    const geometry = new THREE.SphereBufferGeometry(DEFAULT_SETTINGS.size, DEFAULT_SETTINGS.tesselation, DEFAULT_SETTINGS.tesselation)
    BufferGeometryUtils.computeTangents(geometry);

    const lightUniforms = this.lights ? this.lights.getUniforms() : {};
    const materialUniforms = this.material.getUniforms();

    const material = new THREE.ShaderMaterial({
        uniforms : {
            uAverageFrequency : { value : this.audioAnalyser.getAverageFrequency() },
            uNoiseScale : { value : this.uniforms.noiseScale },
            uNoiseFrequency : { value : this.uniforms.noiseFrequency },
            uNoiseOffset : { value : this.uniforms.noiseOffset },
            ...materialUniforms,
            ...lightUniforms
        },
        vertexShader,
        fragmentShader,
    })
    
    this.mesh = new THREE.Mesh(geometry, material); 
    this.mesh.rotation.x -= Math.PI / 2;
    this.mesh.add(this.audio)
}

Sphere.prototype.setGui = function(controller) {
   const sphere = controller.addFolder('Sphere')

   const noiseFolder = sphere.addFolder('Noise');
   noiseFolder.add(this.uniforms, 'noiseScale', 0, 10);
   noiseFolder.add(this.uniforms, 'noiseFrequency', 0, 0.4);

   this.material.setGui(sphere);
}

Sphere.prototype.animate = function() {
    if (!this.mesh) return ;

    this.lights.setUniforms(this.mesh.material);
    this.material.setUniforms(this.mesh.material);

    this.mesh.material.uniforms['uAverageFrequency'].value = this.audioAnalyser.getAverageFrequency();
    this.mesh.material.uniforms['uNoiseScale'].value = this.uniforms.noiseScale;
    this.mesh.material.uniforms['uNoiseOffset'].value.x = this.uniforms.noiseOffset.x += 0.0001;
    this.mesh.material.uniforms['uNoiseOffset'].value.y = this.uniforms.noiseOffset.y += 0.0001;
    this.mesh.material.uniforms['uNoiseFrequency'].value = this.uniforms.noiseFrequency;
   
}  


export default Sphere;