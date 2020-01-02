import * as THREE from 'three';
import Mover from './Mover'

import { loadTexture } from '../utils'

class Movers {
    constructor() {
        this.cubeCamera = null;
        this.count = 40;
        this.array = new Array(this.count).fill(null).map(i => new Mover());
    }
}

Movers.prototype.init = async function(cubeCamera) {

    this.cubeCamera = cubeCamera;
    const scales = new Array(4).fill(null).map(() => THREE.Math.randFloat(0.3, 0.5));

    const geometries = new Array(4).fill(null).map(
        (_, i) => new THREE.SphereBufferGeometry(scales[i], 8, 8));

    const texture = await loadTexture('glitter.jpg');
    const material = new THREE.MeshBasicMaterial({
        color: 0xfafafa, 
        shininess: 1,
        map: cubeCamera.renderTarget,
        // envMap: this.cubeCamera.srenderTarget.texture
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
