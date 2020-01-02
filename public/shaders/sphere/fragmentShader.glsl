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
uniform float   uAverageFrequency;

uniform sampler2D uDiffuseTex;

void main() {

    vec3 colorA = vec3(0.1,0.1,0.1);
    vec3 colorB = vec3(0.7,0.7,0.7);
    float pct = abs(sin(uAverageFrequency));
    vec3 amb = mix(vec3(colorA, colorB, pct));
    vec3 diff = amb;

    // vec3    ambient = uLightAmbient * vec3(texture2D(uDiffuseTex, vUv));
    vec3    ambient = uLightAmbient * uMaterialAmbient;

    vec3    lightDirection = normalize(uLightPosition - vPos);
    float   diffuseIntensity = max(dot(vNormal, lightDirection), 0.0);
    vec3    diffuse = uLightDiffuse * (diffuseIntensity * uMaterialDiffuse);
    // vec3    diffuse = uLightDiffuse * ( diffuseIntensity * vec3(texture2D(uDiffuseTex, vUv)));

    vec3    viewDirection = normalize(cameraPosition - vPos);
    vec3    reflectDirection = reflect(-lightDirection, vNormal);
    float   specularIntensity = pow(max(dot(viewDirection, reflectDirection), 0.0), uMaterialShininess);
    vec3    specular = uLightSpecular * (specularIntensity * uMaterialSpecular);

    vec3 color = ambient + diffuse + specular;
    gl_FragColor = vec4(color, 1.0);
}