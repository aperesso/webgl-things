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

varying float average;

void main() {

    vec3    colorAmbientA = vec3(0.05, 0.05, 0.05);
    vec3    colorAmbientB = vec3(0.1, 0.1, 0.1);
    vec3    colorAmbient = mix(colorAmbientA, colorAmbientB, max(average, 0.2));
    vec3    ambient =  uLightAmbient * colorAmbient;

    vec3    colorDiffuseA = vec3(0.0, 0.0, 0.0);
    vec3    colorDiffuseB = vec3(0.1, 0.1, 0.1);
    vec3    colorDiffuse = mix(colorDiffuseA, colorDiffuseB, max(average, 0.2));

    vec3    lightDirection = normalize(uLightPosition - vPos);
    float   diffuseIntensity =  max(dot(vNormal, lightDirection), 0.0);
    vec3    diffuse = uLightDiffuse * (diffuseIntensity * colorDiffuse);

    vec3    viewDirection = normalize(cameraPosition - vPos);
    vec3    reflectDirection = reflect(-lightDirection, vNormal);
    float   specularIntensity = pow(max(dot(viewDirection, reflectDirection), 0.0), uMaterialShininess);
    vec3    specular = uLightSpecular * (specularIntensity * uMaterialSpecular);

    vec3 color = ambient + diffuse + specular;
    gl_FragColor = vec4(color, 1.);
}