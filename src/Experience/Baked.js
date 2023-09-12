import * as THREE from 'three'

import Experience from './Experience.js'
import vertexShader from './shaders/baked/vertex.glsl'
import fragmentShader from './shaders/baked/fragment.glsl'

export default class CoffeeSteam {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setModel()
    }

    setModel() {
        this.model = {}

        this.model.mesh = this.resources.items.roomModel.scene.children[0]

        // Textures
        const textures = ['bakedDayTexture', 'bakedNightTexture', 'bakedNeutralTexture', 'lightMapTexture'];
        textures.forEach(textureName => {
            this.model[textureName] = this.resources.items[textureName];
            this.model[textureName].encoding = THREE.sRGBEncoding;
            this.model[textureName].flipY = false;
        });

        // Colors
        this.colors = {
            tv: '#ff115e',
            desk: '#ff6700',
            pc: '#0082ff'
        };

        // Material
        this.model.material = new THREE.ShaderMaterial({
            uniforms: {
                uBakedDayTexture: { value: this.model.bakedDayTexture },
                uBakedNightTexture: { value: this.model.bakedNightTexture },
                uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
                uLightMapTexture: { value: this.model.lightMapTexture },
                uNightMix: { value: 1 },
                uNeutralMix: { value: 0 },
                uLightTvColor: { value: new THREE.Color(this.colors.tv) },
                uLightTvStrength: { value: 1.47 },
                uLightDeskColor: { value: new THREE.Color(this.colors.desk) },
                uLightDeskStrength: { value: 1.9 },
                uLightPcColor: { value: new THREE.Color(this.colors.pc) },
                uLightPcStrength: { value: 1.4 }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        // Apply Material to Mesh
        this.model.mesh.traverse((_child) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.model.material
            }
        });

        // Add Mesh to Scene
        this.scene.add(this.model.mesh)
        
    }
}