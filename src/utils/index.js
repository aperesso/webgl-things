import * as THREE from 'three';

const loadFile = path => {

    const file = new Promise((resolve, reject) => {
        fetch(path)
            .then(res => res.text())
            .then(data => resolve(data))
    })

    return file;
}

const loadShaders = async shaderName => {

    const shaders = await Promise.all(['fragmentShader', 'vertexShader']
        .map(shaderType => loadFile(
            `${process.env.PUBLIC_URL}/shaders/${shaderName}/${shaderType}.glsl`
        ))
    )

    return {
        fragmentShader : shaders[0],
        vertexShader : shaders[1]
    } 
}

const loadTexture = async file => {
    const loader = new THREE.TextureLoader();
    const texture = await new Promise((resolve, reject) => {
        loader.load(`${process.env.PUBLIC_URL}/assets/${file}`, texture => {
            resolve(texture)
        })
    })
    return texture;
}

const loadFont = file => {
    const loader = new THREE.FontLoader();

    const font = new Promise(resolve => {
        loader.load(`${process.env.PUBLIC_URL}/assets/fonts/${file}.typeface.json`, font => resolve(font));
    })

    return font;
}

const colorToShader = color => {
    return new THREE.Vector3(...color.map(color => color / 255.0))
}

const loadAudio = file => {
    const loader = new THREE.AudioLoader();

    const audio = new Promise(resolve => {
        loader.load(`${process.env.PUBLIC_URL}/assets/sound/${file}`, buffer => {
            resolve(buffer)
        })
    })

    return audio;
}

export {
    loadFile,
    loadShaders,
    loadFont,
    colorToShader,
    loadTexture,
    loadAudio
}