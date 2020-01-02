import * as THREE from "three";

import SimplexNoise from 'simplex-noise';


class FlowField {
    constructor(flowArea) {
        this.flowArea = flowArea;
        this.grid = null;
        this.gridDimension = 30;
    }
}

FlowField.prototype.getPos = function(coord){
    const c = Math.floor(THREE.Math.mapLinear(coord, -this.flowArea, this.flowArea, 0, this.gridDimension - 1));
    if (c < 0) return 0;
    if (c > this.gridDimension - 1) return this.gridDimension - 1;
    return c;
}

FlowField.prototype.getFlowDirection = function(position) {
    const [x, y, z] = ['x', 'y', 'z'].map(i => this.getPos(position[i]))
    const flowDirection = this.grid[x][y][z];
    return flowDirection;
}

FlowField.prototype.init = function() {
    const simplex = new SimplexNoise(Math.random);
    const grid = new Array(this.gridDimension).fill(null)
        .map(
            (x, i) => new Array(this.gridDimension).fill(null)
                .map(
                    (y, j) => new Array(this.gridDimension).fill(null)
                        .map(
                            (z, k) => {
                                const noise = simplex.noise3D(i , j , k)
                                return new THREE.Vector3(
                                    Math.cos(noise * Math.PI) ,
                                    Math.sin(noise * Math.PI)  ,
                                    Math.cos(noise * Math.PI)
                                ).normalize().multiplyScalar(0.00001)
                            }
                        )
                )
        )
    this.grid = grid;
}


export default FlowField;