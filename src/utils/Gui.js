import * as dat from 'dat.gui';
import * as THREE from 'three';

import * as settings from '../settings';

const Gui = function () {

    const gui = new dat.GUI();

    this.setUpSphereInterface = sphere => {
        const { SPHERE_SETTINGS , GUI_SPHERE_SETTINGS } = settings;
        
        const dashboard = gui.addFolder('sphere');
        
        Object.keys(GUI_SPHERE_SETTINGS).forEach(
            folderKey => {
                const folder = dashboard.addFolder(folderKey);
                const folderSettings = GUI_SPHERE_SETTINGS[folderKey];
                
                Object.keys(folderSettings).forEach(
                    key => {
                        const { [ key ] : { type } } = folderSettings;

                        if (type === 'range') {
                            folder.add(
                                SPHERE_SETTINGS,
                                key,
                                folderSettings[key].range[0],
                                folderSettings[key].range[1]
                            ).onChange(
                                value => {
                                    const uniform = `u${key[0].toUpperCase()}${key.slice(1)}`;
                                    sphere.mesh.material.uniforms[uniform].value = value
                                }
                            )
                            return ;
                        }

                        if (type === 'vector3') {
                            const vectorFolder = folder.addFolder(key);

                            ['x','y','z'].forEach(c => {
                                vectorFolder.add(
                                    SPHERE_SETTINGS[key],
                                    c,
                                    ...folderSettings[key].range
                                ).onChange(
                                    value => {
                                        const uniform = `u${key[0].toUpperCase()}${key.slice(1)}`;
                                        sphere.mesh.material.uniforms[uniform].value[c] = value;
                                    }
                                )
                            })
                        }

                        if (type === 'color') {
                            folder.addColor(
                                SPHERE_SETTINGS,
                                key
                            ).onChange(
                                value => {
                                    const uniform = `u${key[0].toUpperCase()}${key.slice(1)}`;
                                    sphere.mesh.material.uniforms[uniform].value = new THREE.Color(value);
                                }
                            )
                        }
                    }
                )
            }
        )
    }
}

export default Gui;