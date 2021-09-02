import * as THREE from 'three'
import Experience from './Experience.js'
import GoogleLeds from './GoogleLeds.js'
import LoupedeckButtons from './LoupedeckButtons.js'
import CoffeeSteam from './CoffeeSteam.js'
import TopChair from './TopChair.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                // this.setDummy()
                this.setRoom()
                this.setGoogleLeds()
                this.setLoupedeckButtons()
                this.setCoffeeSteam()
                this.setTopChair()
            }
        })
    }

    // setDummy()
    // {
    //     const cube = new THREE.Mesh(
    //         new THREE.BoxGeometry(1, 1, 1),
    //         new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
    //     )
    //     this.scene.add(cube)        
    // }

    setRoom()
    {
        this.room = {}

        this.room.model = this.resources.items.roomModel.scene

        this.room.texture = this.resources.items.bakedTexture
        this.room.texture.encoding = THREE.sRGBEncoding
        this.room.texture.flipY = false

        this.room.material = new THREE.MeshBasicMaterial({ map: this.room.texture })

        this.room.model.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.room.material
            }
        })

        this.scene.add(this.room.model)
    }

    setGoogleLeds()
    {
        this.googleLeds = new GoogleLeds()
    }

    setLoupedeckButtons()
    {
        this.loupedeckButtons = new LoupedeckButtons()
    }

    setCoffeeSteam()
    {
        this.coffeeSteam = new CoffeeSteam()
    }

    setTopChair()
    {
        this.topChair = new TopChair()
    }

    resize()
    {
    }

    update()
    {
        if(this.googleLeds)
            this.googleLeds.update()

        if(this.loupedeckButtons)
            this.loupedeckButtons.update()

        if(this.coffeeSteam)
            this.coffeeSteam.update()

        if(this.topChair)
            this.topChair.update()
    }

    destroy()
    {
    }
}