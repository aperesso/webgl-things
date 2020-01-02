import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Sphere from './Sphere';
import Light from './Light';
import ParticleSystem from './ParticleSystem';
import Movers from './Movers';
import PostProcessing from './PostProcessing';

const FOV   = 100;
const NEAR  = 0.1;
const FAR   = 1000;
const margin = 200

class World {
    constructor() {
        this.scene  = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / (window.innerHeight - margin), NEAR, FAR);
        this.cubeCamera = new THREE.CubeCamera(1, 1000, 256);
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
       
        this.sphere = new Sphere();
        this.particleSystem = new ParticleSystem();
        this.movers = new Movers();
        this.light = new Light();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.postProcessor = new PostProcessing(this.scene, this.camera, this.renderer)
    } 
}

World.prototype.listenForResize = function() {
    window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / (window.innerHeight - margin);
        this.camera.updateProjectionMatrix();
        this.postProcessor.setSize();
    })
}

World.prototype.setUpMeshes = async function() {

    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfafafa, 0.7);
    directionalLight.position.set(0, 10, 5);
    this.scene.add(directionalLight);

    this.sphere.setLights(this.light);
    await this.sphere.initMesh();
    this.scene.add(this.sphere.mesh);
    // this.sphere.mesh.layers.disableAll();
    // this.sphere.mesh.layers.enable(0);
    // this.sphere.mesh.layers.enable(1);

    await this.particleSystem.init();
    this.scene.add(this.particleSystem.mesh);
    // this.particleSystem.mesh.layers.disableAll();
    // this.particleSystem.mesh.layers.enable(1);


    await this.movers.init(this.cubeCamera);
    this.movers.array.forEach(mover => this.scene.add(mover.mesh))

    

}

World.prototype.init = async function() { 
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor(new THREE.Color('#fadadd'), 1.0);

    this.camera.position.z = 20;
    this.camera.position.y = 0;
    this.cubeCamera.position.copy(this.camera.position)

    this.setUpMeshes();
    this.setUpGui();

    this.postProcessor.setSize();
    this.postProcessor.applyBloom();
    this.listenForResize();

    this.postProcessor.init();
    // this.postProcessor.applyBloom();
    
    document.body.appendChild(this.renderer.domElement);
}

World.prototype.start = function() {
    this.renderer.setAnimationLoop(
        () => {
            const time = Date.now() * 0.001;
            this.cubeCamera.update(this.renderer, this.scene);
            this.sphere.animate();
            this.movers.animate(time);
            this.particleSystem.animate();
            this.postProcessor.render();
        }
    )
}

World.prototype.setUpGui = function() {
    const gui = new dat.GUI();
    this.light.setGui(gui);
    this.sphere.setGui(gui);
}

export default World;