import * as THREE from 'three';

import { loadTexture } from '../utils';

import Particle from './Particle';
import FlowField from './FlowField'

class ParticleSystem {
    constructor() {
        this.radius = 40;
        this.particlesCount = 800;

        this.mesh = null;
        this.flowField = new FlowField(this.radius);
        this.particles = null;
    }
}

ParticleSystem.prototype.initParticles = function() {
    this.particles = new Array(this.particlesCount)
        .fill(null)
        .map(() => new Particle(this.radius))
}

ParticleSystem.prototype.getPositionsAttribute = function() {
    const positions = this.particles.reduce((acc, particle) => {
        const x = particle.position.x;
        const y = particle.position.y;
        const z = particle.position.z;
        return [...acc, x, y, z]
    }, [])
    return positions;
}

ParticleSystem.prototype.initMesh = async function() {
    const geometry = new THREE.BufferGeometry();
    const positions = this.getPositionsAttribute();
    
    geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
    )

    const texture = await loadTexture('particlePink.png');
    const material = new THREE.PointsMaterial({
        size : 0.3,
        color: 0xffffff,
        map: texture,
        alphaMap: texture,
        transparent: true,
        opacity: 1.0,
        depthWrite: false
    });

    this.mesh = new THREE.Points(geometry, material);
}

ParticleSystem.prototype.init = async function() {
    this.flowField.init();
    this.initParticles();
    await this.initMesh();
}

ParticleSystem.prototype.animateParticles = function() {
    this.particles.forEach(
        particle => {
            const flow = this.flowField.getFlowDirection(particle.position);
            particle.applyForce(flow)
            particle.animate()
        }
    );
}

ParticleSystem.prototype.updateMesh = function() {
    const positions = this.getPositionsAttribute();
    const vertices = this.mesh.geometry.attributes.position.array;
    for (let i in vertices) {
        vertices[i] = positions[i]
    }
    this.mesh.geometry.attributes.position.needsUpdate = true;
    // this.mesh.rotation.z += 0.01;
}



ParticleSystem.prototype.animate = function() {
    if (!this.particles || !this.mesh) return;
    this.animateParticles(this.flowField)
    this.updateMesh();
}

export default ParticleSystem