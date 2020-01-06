import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import Stats from 'three/examples/jsm/libs/stats.module';

import { getDimensions } from '.';
// import { BLOOM_SETTINGS } from '../settings'
const PostProcessor = function(scene, camera) {
    const canvas = document.getElementById("canvas");
    const { width , height } = getDimensions();

    const stats = new Stats();
    document.body.appendChild( stats.dom );

    this.renderer = new THREE.WebGLRenderer({ canvas , alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(new THREE.Color('#010101'), 1.);
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaFactor = 2.2;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;

    const composer = new EffectComposer(this.renderer);
    composer.setSize(width, height);

    const renderScene = new RenderPass(scene, camera);
    composer.addPass(renderScene);

    this.render = () => {
        stats.begin();
        composer.render();
        stats.end();
    }
}

export default PostProcessor;