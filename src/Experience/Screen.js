import * as THREE from 'three'
import Experience from './Experience.js'

export default class Screen {
    constructor(_mesh, _sourcePath) {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.world = this.experience.world

        this.mesh = _mesh
        this.sourcePath = _sourcePath

        this.setModel()
    }

    setModel() {
        this.model = {}

        // Texture
        const textureLoader = new THREE.TextureLoader();
        this.model.texture = textureLoader.load(this.sourcePath);
        this.model.texture.encoding = THREE.sRGBEncoding;

        // Material
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture
        });

        // Mesh
        this.model.mesh = this.mesh
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)
    }

    update() {
        // this.model.group.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5
    }
}
