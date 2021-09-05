import * as THREE from 'three'

import Experience from './Experience.js'

export default class TopChair
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.time = this.experience.time

        this.setModel()
    }

    setModel()
    {
        this.model = {}

        this.model.group = this.resources.items.topChairModel.scene.children[0]
        this.scene.add(this.model.group)
        
        this.model.group.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.world.baked.model.material
            }
        })
    }

    update()
    {
        this.model.group.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5
    }
}