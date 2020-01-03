varying vec3    vPos;
varying vec3    vNormal;

uniform vec3    uLightPosition;
uniform vec3    uLightDiffuse;
uniform vec3    uLightAmbient;
uniform vec3    uLightSpecular;

uniform vec3    uMaterialAmbient;
uniform vec3    uMaterialDiffuse;
uniform vec3    uMaterialSpecular;
uniform float   uMaterialShininess;

uniform float   uTime;
const float shininess = 64.0;
const float screenGamma = 2.2; // Assume the monitor is calibrated to the sRGB color space
const float lightPower = 8000.;

void main() {

    // vec3    ambient = uLightAmbient * vec3(texture2D(uDiffuseTex, vUv));
    vec3    ambient =  uLightAmbient * uMaterialAmbient;

    vec3    lightDirection = normalize(uLightPosition - vPos);
    float   diffuseIntensity =  max(dot(vNormal, lightDirection), 0.0);
    vec3    diffuse = uLightDiffuse * (diffuseIntensity * uMaterialDiffuse);
    // vec3    diffuse = uLightDiffuse * ( diffuseIntensity * vec3(texture2D(uDiffuseTex, vUv)));

    vec3    viewDirection = normalize(cameraPosition - vPos);
    vec3    reflectDirection = reflect(-lightDirection, vNormal);
    float   specularIntensity = pow(max(dot(viewDirection, reflectDirection), 0.0), uMaterialShininess);
    vec3    specular = uLightSpecular * (specularIntensity * uMaterialSpecular);

    // vec3 color = ambient + diffuse + specular;
    vec3 color = ambient + diffuse + specular;
    vec3 colorGammaCorrected = pow(color, vec3(1.0 / screenGamma));
//   // use the gamma corrected color in the fragment
//   gl_FragColor = vec4(colorLinear, 1.0);
    gl_FragColor = vec4(color, 1.0);
}



// void main() {
//     float dist = length(uLightPosition - vPos);
//     vec3 lightDir = uLightPosition - vPos;
//     float distance = length(lightDir);
//     dist = distance * distance;
//     lightDir = normalize(lightDir);

//     float lambertian = max(dot(lightDir,vNormal), 0.0);
//     float specular = 0.0;

//     if (lambertian > 0.0) {

//     vec3 viewDir = normalize(-vPos);

//     // this is blinn phong
//     vec3 halfDir = normalize(lightDir + viewDir);
//     float specAngle = max(dot(halfDir, vNormal), 0.0);
//     specular = pow(specAngle, uMaterialShininess);
//   }
//   vec3 colorLinear = uMaterialAmbient +
//                      uMaterialDiffuse * lambertian * uLightDiffuse * lightPower / dist +
//                     uMaterialSpecular * specular * uLightDiffuse * lightPower / dist ;
//   // apply gamma correction (assume ambientColor, diffuseColor and specColor
//   // have been linearized, i.e. have no gamma correction in them)
//   vec3 colorGammaCorrected = pow(colorLinear, vec3(1.0 / screenGamma));
//   // use the gamma corrected color in the fragment
//   gl_FragColor = vec4(colorLinear, 1.0);
// }