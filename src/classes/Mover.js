
class Mover {
    constructor() {
        this.radius = 18 + Math.random() * 2;
        this.longitude = Math.random() * Math.PI;
        this.latitude = Math.random() * Math.PI * 2.0;
        this.mesh = null;
        this.speed = 0.01 + Math.random() * 0.02;
    }
}

Mover.prototype.initMesh = function(mesh) {
    this.mesh = mesh;
}

Mover.prototype.animate = function(time) {

    if (this.mesh === null) return;

    this.longitude += this.speed;
    this.latitude += this.speed;
    
    const x = this.radius * Math.sin(this.longitude) * Math.cos(this.latitude)
    const y = this.radius * Math.sin(this.longitude) * Math.sin(this.latitude)
    const z = this.radius * Math.cos(this.longitude)

    this.mesh.position.set(x,y,z);
}

export default Mover;