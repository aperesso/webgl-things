import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples//jsm/postprocessing/UnrealBloomPass';


import { loadShaders} from '../utils';

const margin = 200;

class PostProcessor{
    constructor(scene, camera, renderer) {
        this.composer = new EffectComposer(renderer);
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }
}

PostProcessor.prototype.init = function() {
    // this.renderer.gammaInput = true
    // this.renderer.gammaOutput = true
    // this.renderer.toneMappingExposure = Math.pow( 0.9, 4.0 ) 
    const scenePass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(scenePass);
};

PostProcessor.prototype.applyBloom = async function() {

    const params = {
        exposure: 0.1,
        bloomStrength: 1.4,
        bloomThreshold: 3,
        bloomRadius: 5
    };

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight - margin))
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    bloomPass.renderToScreen = true;

    const shaders = await loadShaders('gaussianBlur/horizontal');

    const shaderPass = new ShaderPass({
        uniforms : {
            tDiffuse : { value : null },
            resolution : { value : new THREE.Vector2(window.innerWidth, window.innerHeight - margin)}
        },
        ...shaders
    })

    this.composer.addPass(bloomPass);
}


PostProcessor.prototype.render = function() {
    // this.camera.layers.set(0);
    // this.blurComposer.render();
    // this.renderer.clearDepth();
    // this.camera.layers.set(1);
    this.composer.render();
    // this.renderer.clearDepth();

    // this.renderer.render(this.scene, this.camera);

}

PostProcessor.prototype.setSize = function() {
    const w = window.innerWidth;
    const h = window.innerHeight - margin;

    this.composer.setSize(w, h);
    this.renderer.setSize(w, h);

    // if (this.gaussianPass.vertical !== null && this.gaussianPass.horizontal !== null) {
    //     this.gaussianPass.vertical.uniforms.resolution.value = new THREE.Vector2(w, h)
    //     this.gaussianPass.horizontal.uniforms.resolution.value = new THREE.Vector2(w, h)
    // }

}

export default PostProcessor;