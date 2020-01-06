import * as THREE from 'three';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import Sphere from './scene/Sphere';
// import Background from './scene/Background';
import Particles from './scene/Particles';

import { CAMERA_SETTINGS , LIGHT_SETTINGS }  from './settings';

import { getDimensions } from './utils/index';
import Gui from './utils/Gui';
import Audio from './utils/Audio';
import PostProcessing from './utils/PostProcessing';

import './index.css';

const App = function() {

  const { width , height } = getDimensions();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    CAMERA_SETTINGS.fov,
    width / height,
    CAMERA_SETTINGS.near,
    CAMERA_SETTINGS.far)
  camera.position.set(0,0,20);
  camera.lookAt(new THREE.Vector3(0,0,0))

  const { ambient , diffuse , ambientIntensity, diffuseIntensity , position } = LIGHT_SETTINGS;

  const ambientLight = new THREE.AmbientLight(ambient, ambientIntensity);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(diffuse, diffuseIntensity)
  directionalLight.position.copy(position);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const sphere = new Sphere();
  const particles = new Particles();
  const postProcessor = new PostProcessing(scene, camera);
  const gui = new Gui();
  const audio = new Audio();

  this.load = async () => {
    await audio.load();
    await sphere.setMesh(audio);
    scene.add(sphere.mesh);
    gui.setUpSphereInterface(sphere);
    await particles.init(audio);
    scene.add(particles.points);
  }

  this.loop = function() {
    postProcessor.renderer.setAnimationLoop(() => {
      audio.update();
      sphere.animate();
      particles.animate();
      postProcessor.render();
    })
  }
}


const app = new App();
app.load()
  .then(() => app.loop());
