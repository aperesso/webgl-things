import { colorToShader } from "../utils";

const DEFAULT_SETTINGS = {
    ambient : [245,123,123],
    specular : [255,255,255],
    diffuse : [245,123,123],
    shininess : 17,
}

class Material {
    constructor(ambient, diffuse, specular, shininess) {
        this.ambient = DEFAULT_SETTINGS.ambient;
        this.diffuse = DEFAULT_SETTINGS.diffuse;
        this.specular = DEFAULT_SETTINGS.specular;
        this.shininess = DEFAULT_SETTINGS.shininess;
    }
}

Material.prototype.getUniforms = function() {
    return {
        [`uMaterialAmbient`] : { value : colorToShader(this.ambient) },
        [`uMaterialSpecular`] : { value : colorToShader(this.specular) },
        [`uMaterialDiffuse`] : { value : colorToShader(this.diffuse) },
        [`uMaterialShininess`] : { value : this.shininess }
    }
}

Material.prototype.setUniforms = function(material) {
    if (!material) return ;

    material.uniforms[`uMaterialAmbient`].value = colorToShader(this.diffuse) ;
    material.uniforms[`uMaterialSpecular`].value = colorToShader(this.specular) ;
    material.uniforms[`uMaterialDiffuse`].value = colorToShader(this.diffuse) ;
    material.uniforms[`uMaterialShininess`].value =this.shininess ;
}

Material.prototype.setGui = function(controller) {
    const materialController = controller.addFolder('Material');
    materialController.addColor(this, "ambient");
    materialController.addColor(this, "specular");
    materialController.addColor(this, "diffuse");
    materialController.add(this, "shininess", 1, 64);
}

export default Material