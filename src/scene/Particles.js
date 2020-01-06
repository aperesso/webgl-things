import * as THREE from 'three';

import { loadTexture, loadShaders } from '../utils';

const Particle = function() {
    this.radius = Math.random() * 10 + 10.0;
    this.longitude = Math.random() * Math.PI;
    this.latitude = Math.random() * Math.PI * 2.0;
    this.speed = 0.001;
}

const Particles = function() {

    const particlesCount = 500;
    const array = new Array(particlesCount).fill(null).map(() => new Particle())
    
    const positions = new Array(particlesCount * 3).fill(0);
    const radius = array.map(particle => particle.radius);
    const longitude = array.map(particle => particle.longitude);
    const latitude = array.map(particle => particle.latitude);
    const speed = array.map(particle => particle.speed);

    const geometry = new THREE.BufferGeometry();    
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'radius', new THREE.Float32BufferAttribute( radius, 1 ) );
    geometry.setAttribute( 'longitude', new THREE.Float32BufferAttribute( longitude, 1 ) );
    geometry.setAttribute( 'latitude', new THREE.Float32BufferAttribute( latitude, 1 ) );
    geometry.setAttribute( 'speed', new THREE.Float32BufferAttribute( speed, 1 ) );

    this.audio = null;

    this.init = async audio => {
        const texture = await loadTexture('textures/smoke.png');
        const shaders = await loadShaders('particles');
        
        this.audio = audio;

        const material = new THREE.ShaderMaterial({
            uniforms : {
                uAudioBandsBuffer : { value : this.audio.audioBandsBuffer},
                pointTexture : { value : texture },
                opacity : { value : 0.1 },
                time : { value : 0.0 }
            },
            ...shaders
        })

        material.transparent = true;
        material.depthWrite = false;
        material.blending = THREE.AdditiveBlending;

        this.points = new THREE.Points(
            geometry, 
            material,
        );
    }

    this.animate = () => {
        const longitudes = this.points.geometry.attributes.longitude.array;
        const latitudes = this.points.geometry.attributes.longitude.array;
        
        for (let i in longitudes) {
            longitudes[i] += array[i].speed;
            latitudes[i] += array[i].speed;
        }
        
        this.points.geometry.attributes.longitude.needsUpdate = true;
        this.points.geometry.attributes.latitude.needsUpdate = true;

        this.points.material.uniforms["uAudioBandsBuffer"].value = this.audio.audioBandsBuffer;

    }
}

export default Particles;