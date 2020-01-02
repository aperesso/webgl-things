import * as THREE from 'three';

import { colorToShader } from '../utils';

const DEFAULT_SETTINGS = {
    ambient : [255,255,255],
    diffuse : [255,255,255],
    specular : [255,255,255],
 
    position : new THREE.Vector3(0,-40,0),
}

class Light {
    constructor(label = "Light") {
        this.label = label;
        this.ambient = DEFAULT_SETTINGS.ambient;
        this.diffuse = DEFAULT_SETTINGS.diffuse;
        this.specular = DEFAULT_SETTINGS.specular;
        this.position = DEFAULT_SETTINGS.position;
    }
}

Light.prototype.setGui = function(controller) {
    const lightController = controller.addFolder(this.label);
    lightController.addColor(this, 'ambient');
    lightController.addColor(this, 'diffuse');
    lightController.addColor(this, 'specular');
    const lightPositionController = lightController.addFolder("Position");
    lightPositionController.add(this.position, 'x', -100, 100);
    lightPositionController.add(this.position, 'y', -100, 100);
    lightPositionController.add(this.position, 'z', -100, 100);
}

Light.prototype.getUniforms = function() {
    return {
        [`u${this.label}Ambient`] : { value : colorToShader(this.ambient) },
        [`u${this.label}Diffuse`] : { value : colorToShader(this.diffuse) },
        [`u${this.label}Specular`] : { value : colorToShader(this.specular) },
        [`u${this.label}Position`] : { value : this.position }
    }
} 

Light.prototype.setUniforms = function(material) {
    material.uniforms[`u${this.label}Ambient`].value = colorToShader(this.ambient);
    material.uniforms[`u${this.label}Diffuse`].value = colorToShader(this.diffuse);
    material.uniforms[`u${this.label}Specular`].value = colorToShader(this.specular);
    material.uniforms[`u${this.label}Position`].value = this.position;
}

export default Light;