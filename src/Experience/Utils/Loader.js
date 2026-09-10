// src/Experience/Utils/Loader.js
import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import * as THREE from 'three'

export default class Loader extends EventEmitter {
    constructor() {
        super()

        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance

        this.setLoaders()

        this.toLoad = 0
        this.loaded = 0
        this.items = {}
    }

    setLoaders() {
        this.loaders = []

        // Images
        this.loaders.push({
            extensions: ['jpg', 'png'],
            action: (_resource) => {
                const image = new Image()
                image.addEventListener('load', () => this.fileLoadEnd(_resource, image))
                image.addEventListener('error', () => this.fileLoadEnd(_resource, image))
                image.src = _resource.source // ⚡ use exactly what assets.js provides
            }
        })

        // KTX2 / Basis images
        const ktx2Loader = new KTX2Loader()
        ktx2Loader.setTranscoderPath('basis/')
        ktx2Loader.detectSupport(this.renderer)
        this.loaders.push({
            extensions: ['basis', 'ktx2'],
            action: (_resource) => {
                ktx2Loader.load(_resource.source, (_data) => this.fileLoadEnd(_resource, _data))
            }
        })

        // Draco
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('draco/')
        // Removed deprecated setDecoderConfig line here 🛠️
        this.loaders.push({
            extensions: ['drc'],
            action: (_resource) => {
                dracoLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                    DRACOLoader.releaseDecoderModule()
                })
            }
        })

        // GLTF
        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)
        this.loaders.push({
            extensions: ['glb', 'gltf'],
            action: (_resource) => {
                gltfLoader.load(_resource.source, (_data) => this.fileLoadEnd(_resource, _data))
            }
        })

        // FBX
        const fbxLoader = new FBXLoader()
        this.loaders.push({
            extensions: ['fbx'],
            action: (_resource) => {
                fbxLoader.load(_resource.source, (_data) => this.fileLoadEnd(_resource, _data))
            }
        })

        // HDR
        const hdrLoader = new HDRLoader()
        this.loaders.push({
            extensions: ['hdr'],
            action: (_resource) => {
                hdrLoader.load(_resource.source, (_data) => {
                    _data.mapping = THREE.EquirectangularReflectionMapping
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })
    }

    load(_resources = []) {
        for (const _resource of _resources) {
            this.toLoad++
            const extensionMatch = _resource.source.match(/\.([a-z]+)$/)
            if (!extensionMatch || !extensionMatch[1]) {
                console.warn(`Cannot find extension of ${_resource.source}`)
                continue
            }

            const extension = extensionMatch[1]
            const loader = this.loaders.find(l => l.extensions.includes(extension))
            if (loader) {
                loader.action(_resource)
            } else {
                console.warn(`No loader found for ${_resource.source}`)
            }
        }
    }

    fileLoadEnd(_resource, _data) {
        this.loaded++
        this.items[_resource.name] = _data
        this.trigger('fileEnd', [_resource, _data])
        if (this.loaded === this.toLoad) this.trigger('end')
    }
}
