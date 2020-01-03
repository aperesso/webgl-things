import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Sphere from './scene/Sphere';
import Background from './scene/Background';

import { CAMERA_SETTINGS , LIGHT_SETTINGS }  from './settings';

import './index.css';

const App = function() {

  this.isLoading = true;

  this.setup = async function() {
    const { width , height } = this.getDimensions();
    const canvas = document.getElementById("canvas");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_SETTINGS.fov,
      width / height,
      CAMERA_SETTINGS.near,
      CAMERA_SETTINGS.far)
    camera.position.set(0,0, 30);

    const renderer = new THREE.WebGLRenderer({antialias : true, canvas, alpha: true});
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.physicallyCorrectLights = true;

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  this.lightUpScene = function() {
    
    const { ambient , diffuse , ambientIntensity, diffuseIntensity , position } = LIGHT_SETTINGS;

    const ambientLight = new THREE.AmbientLight(ambient, ambientIntensity);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(diffuse, diffuseIntensity)
    directionalLight.position.copy(position);


    directionalLight.shadow.mapSize.width = 2048;  
    directionalLight.shadow.mapSize.height = 2048; 
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = -10;
    directionalLight.shadow.camera.bottom = 10; 


    directionalLight.castShadow = true;


    this.scene.add(directionalLight);
  }

  this.load = async function() {
    this.sphere = new Sphere();
    await this.sphere.setMesh();
    this.scene.add(this.sphere.mesh);

    
    this.background = new Background();
    this.scene.add(this.background.mesh);
    this.isLoading = false;
  }

  this.getDimensions = function() {
    const canvas = document.getElementById("canvas");
    const { width , height } = canvas.getBoundingClientRect();
    return {width, height}
  }

  this.loop = function() {
    this.renderer.setAnimationLoop(() => {
        if (this.isLoading) return ;
        this.sphere.animate();
        this.renderer.render(this.scene, this.camera)
      }
    )
  }

}

const app = new App();
app.setup();
app.lightUpScene();
app.load();
app.loop()
