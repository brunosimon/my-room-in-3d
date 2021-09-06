import * as THREE from 'three'

import Experience from './Experience.js'

export default class BouncingLogo
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.time = this.experience.time

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'bouncingLogo',
                expanded: false
            })
        }

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = {}

        this.model.group = new THREE.Group()
        this.model.group.position.x = 4.2
        this.model.group.position.y = 2.717
        this.model.group.position.z = 1.630
        this.scene.add(this.model.group)

        this.model.texture = this.resources.items.threejsJourneyLogoTexture
        this.model.texture.encoding = THREE.sRGBEncoding

        this.model.geometry = new THREE.PlaneGeometry(4, 1, 1, 1)
        this.model.geometry.rotateY(- Math.PI * 0.5)

        this.model.material = new THREE.MeshBasicMaterial({
            transparent: true,
            premultipliedAlpha: true,
            map: this.model.texture
        })

        this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
        this.model.mesh.scale.y = 0.359
        this.model.mesh.scale.z = 0.424
        this.model.group.add(this.model.mesh)

        // Debug
        if(this.debug)
        {
            this.debugFolder.addInput(
                this.model.group.position,
                'x',
                {
                    label: 'positionX', min: - 5, max: 5, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.model.group.position,
                'y',
                {
                    label: 'positionY', min: - 5, max: 5, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.model.group.position,
                'z',
                {
                    label: 'positionZ', min: - 5, max: 5, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.model.mesh.scale,
                'z',
                {
                    label: 'scaleZ', min: 0.001, max: 1, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.model.mesh.scale,
                'y',
                {
                    label: 'scaleY', min: 0.001, max: 1, step: 0.001
                }
            )
        }
    }

    setAnimation()
    {
        this.animations = {}

        this.animations.z = 0
        this.animations.y = 0

        this.animations.limits = {}
        this.animations.limits.z = { min: -1.076, max: 1.454 }
        this.animations.limits.y = { min: -1.055, max: 0.947 }

        this.animations.speed = {}
        this.animations.speed.z = 0.00061
        this.animations.speed.y = 0.00037

        if(this.debug)
        {
            this.debugFolder.addInput(
                this.animations.limits.z,
                'min',
                {
                    label: 'limitZMin', min: - 3, max: 0, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.animations.limits.z,
                'max',
                {
                    label: 'limitZMax', min: 0, max: 3, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.animations.limits.y,
                'min',
                {
                    label: 'limitYMin', min: - 3, max: 0, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.animations.limits.y,
                'max',
                {
                    label: 'limitYMax', min: 0, max: 3, step: 0.001
                }
            )

            this.debugFolder.addInput(
                this.animations.speed,
                'z',
                {
                    label: 'speedZ', min: 0, max: 0.001, step: 0.00001
                }
            )

            this.debugFolder.addInput(
                this.animations.speed,
                'y',
                {
                    label: 'speedY', min: 0, max: 0.001, step: 0.00001
                }
            )
        }
    }

    update()
    {
        this.animations.z += this.animations.speed.z * this.time.delta
        this.animations.y += this.animations.speed.y * this.time.delta

        if(this.animations.z > this.animations.limits.z.max)
        {
            this.animations.z = this.animations.limits.z.max
            this.animations.speed.z *= -1
        }
        if(this.animations.z < this.animations.limits.z.min)
        {
            this.animations.z = this.animations.limits.z.min
            this.animations.speed.z *= -1
        }
        if(this.animations.y > this.animations.limits.y.max)
        {
            this.animations.y = this.animations.limits.y.max
            this.animations.speed.y *= -1
        }
        if(this.animations.y < this.animations.limits.y.min)
        {
            this.animations.y = this.animations.limits.y.min
            this.animations.speed.y *= -1
        }

        this.model.mesh.position.z = this.animations.z
        this.model.mesh.position.y = this.animations.y
    }
}