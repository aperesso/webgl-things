import * as THREE from 'three';

class Particle {
    constructor(areaSize) {
        this.areaSize = areaSize;
        this.position = new THREE.Vector3(
            THREE.Math.randFloatSpread(areaSize),
            THREE.Math.randFloatSpread(areaSize),
            THREE.Math.randFloatSpread(areaSize)
        );
        this.velocity = new THREE.Vector3(
            THREE.Math.randFloatSpread(0.2),
            THREE.Math.randFloatSpread(0.2),
            THREE.Math.randFloatSpread(0.2)
        );
        this.acceleration = new THREE.Vector3(0,0,0)
    }
}

Particle.prototype.applyForce = function(force) {
    this.acceleration.add(force);
}


// const origin = new THREE.Vecto r3(0,0,0);
Particle.prototype.checkEdge = function() {
    Object.keys(this.position).forEach(i => {
        if (this.position[i] < -this.areaSize/2 || this.position[i > this.areaSize/2])
            this.position[i] = THREE.Math.randFloatSpread(1)
    })
}



Particle.prototype.animate = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.checkEdge();
    this.acceleration.multiplyScalar(0);
}

export default Particle;