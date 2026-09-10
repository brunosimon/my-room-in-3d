import * as THREE from 'three'
import Experience from './Experience.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export default class Renderer {
    constructor(_options = {}) {
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.stats = this.experience.stats
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        
        this.usePostprocess = false

        this.setInstance()
        this.setPostProcess()
    }

    setInstance() {
        this.clearColor = '#010101'

        // Renderer
        this.instance = new THREE.WebGLRenderer({
            alpha: false,
            antialias: true
        })
        this.instance.domElement.style.position = 'absolute'
        this.instance.domElement.style.top = 0
        this.instance.domElement.style.left = 0
        this.instance.domElement.style.width = '100%'
        this.instance.domElement.style.height = '100%'

        this.instance.setClearColor(this.clearColor, 1)
        this.instance.setSize(this.config.width, this.config.height)
        this.instance.setPixelRatio(this.config.pixelRatio)
        this.instance.outputEncoding = THREE.sRGBEncoding

        this.context = this.instance.getContext()

        // Add stats panel if exists
        if (this.stats) {
            this.stats.setRenderPanel(this.context)
        }
    }

    setPostProcess() {
        this.postProcess = {}

        // Render pass
        this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance)

        // Modern safe selection of render target class
        const RenderTargetClass = (THREE.WebGLMultisampleRenderTarget && this.instance.capabilities.isWebGL2)
            ? THREE.WebGLMultisampleRenderTarget
            : THREE.WebGLRenderTarget

        this.renderTarget = new RenderTargetClass(
            this.config.width,
            this.config.height,
            {
                generateMipmaps: false,
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBFormat,
                encoding: THREE.sRGBEncoding
            }
        )

        // Effect composer
        this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)
        this.postProcess.composer.setSize(this.config.width, this.config.height)
        this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
        this.postProcess.composer.addPass(this.postProcess.renderPass)
    }

    resize() {
        // Renderer size
        this.instance.setSize(this.config.width, this.config.height)
        this.instance.setPixelRatio(this.config.pixelRatio)

        // Post process size
        if (this.postProcess.composer) {
            this.postProcess.composer.setSize(this.config.width, this.config.height)
            this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
        }
    }

    update() {
        if (this.stats) this.stats.beforeRender()

        if (this.usePostprocess && this.postProcess.composer) {
            this.postProcess.composer.render()
        } else {
            this.instance.render(this.scene, this.camera.instance)
        }

        if (this.stats) this.stats.afterRender()
    }

    destroy() {
        if (this.instance) {
            this.instance.renderLists.dispose()
            this.instance.dispose()
        }

        if (this.renderTarget) this.renderTarget.dispose()

        if (this.postProcess.composer) {
            if (this.postProcess.composer.renderTarget1) this.postProcess.composer.renderTarget1.dispose()
            if (this.postProcess.composer.renderTarget2) this.postProcess.composer.renderTarget2.dispose()
        }
    }
}