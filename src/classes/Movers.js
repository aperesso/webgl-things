import * as THREE from 'three';
import Mover from './Mover'

class Movers {
    constructor() {
        this.cubeCamera = null;
        this.count = 40;
        this.array = new Array(this.count).fill(null).map(i => new Mover());
    }
}

Movers.prototype.init = function(cubeCamera) {

    this.cubeCamera = cubeCamera;

    const scales = new Array(4).fill(null).map(() => THREE.Math.randFloat(0.3, 0.5));

    const geometries = new Array(4).fill(null).map(
        (_, i) => new THREE.SphereBufferGeometry(scales[i], 8, 8)
    )
    const material = new THREE.MeshPhongMaterial({
        color: 0x101010, 
        reflectivity: 0.95,
    })

    this.array.forEach(
        (_, i) => {
            const mesh = new THREE.Mesh(geometries[i%4], material);
            this.array[i].initMesh(mesh)
        }
    )
}

Movers.prototype.animate = function(time) {
    this.array.forEach(mover => mover.animate(time));
}

export default Movers;
