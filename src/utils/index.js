import * as THREE from 'three';

const replaceThreeChunkFn = (a, b) => {
    return THREE.ShaderChunk[b] + '\n';
}

const shaderParse = glsl => {
    return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
}

const loadFile = path => {

    const file = new Promise((resolve, reject) => {
        fetch(path)
            .then(res => res.text())
            .then(data => resolve(shaderParse(data)))
    })

    return file;
}

const loadSkyBox = (path, format = 'png') => {

    const urls = [
        `${process.env.PUBLIC_URL}/assets/skybox/${path}/right.${format}`,
        `${process.env.PUBLIC_URL}/assets/skybox/${path}/left.${format}`,
        `${process.env.PUBLIC_URL}/assets/skybox/${path}/top.${format}`,
        `${process.env.PUBLIC_URL}/assets/skybox/${path}/bottom.${format}`,
        `${process.env.PUBLIC_URL}/assets/skybox/${path}/back.${format}`,
        `${process.env.PUBLIC_URL}/assets/skybox/${path}/front.${format}`,
    ]

    const loader = new THREE.CubeTextureLoader();

    const skyBox = new Promise((resolve, reject) => {
        loader.load(urls, texture => {
            resolve (texture)
        })
    });

    return skyBox;
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

const getDimensions = function() {
    const canvas = document.getElementById("canvas");
    const { width , height } = canvas.getBoundingClientRect();
    return {width, height}
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
    loadAudio,
    loadSkyBox,
    getDimensions,
}