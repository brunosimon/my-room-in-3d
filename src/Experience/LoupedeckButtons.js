import * as THREE from 'three'
import { gsap } from 'gsap'

import Experience from './Experience.js'

export default class LoupedeckButtons
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'loupedeckButtons',
                expanded: false
            })
        }

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = {}

        this.model.items = []

        // Children
        const children = [...this.resources.items.loupedeckButtonsModel.scene.children]
        children.sort((_a, _b) =>
        {
            if(_a.name < _b.name)
                return -1

            if(_a.name > _b.name)
                return 1

            return 0
        })
        
        let i = 0
        for(const _child of children)
        {
            const item = {}

            item.index = i

            item.material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true
            })

            item.mesh = _child
            item.mesh.material = item.material
            this.scene.add(item.mesh)

            this.model.items.push(item)

            // // Debug
            // if(this.debug)
            // {
            //     this.debugFolder
            //         .addInput(
            //             item,
            //             'color',
            //             { view: 'color' }
            //         )
            //         .on('change', () =>
            //         {
            //             item.material.color.set(item.color)
            //         })
            // }

            i++
        }
    }

    setAnimation()
    {
        this.animation = {}

        this.animation.colors = ['#af55cf', '#dbd85d', '#e86b24', '#b81b54']

        for(const _colorIndex in this.animation.colors)
        {
            // Debug
            if(this.debug)
            {
                this.debugFolder
                    .addInput(
                        this.animation.colors,
                        _colorIndex,
                        { view: 'color' }
                    )
                    // .on('change', () =>
                    // {
                    //     item.material.color.set(item.color)
                    // })
            }
        }

        this.animation.play = () =>
        {
            const buttons = []
            const outButtons = []

            for(const _button of this.model.items)
            {
                if(Math.random() < 0.5)
                {
                    buttons.push(_button)
                }
                else
                {
                    outButtons.push(_button)
                }
            }

            for(const _button of outButtons)
            {
                _button.material.opacity = 0
            }

            let i = 0
            for(const _button of buttons)
            {
                _button.material.color.set(this.animation.colors[Math.floor(Math.random() * this.animation.colors.length)])
                gsap.to(
                    _button.material,
                    {
                        delay: i * 0.05,
                        duration: 0.2,
                        opacity: 1,
                        onComplete: () =>
                        {
                            gsap.to(
                                _button.material,
                                {
                                    delay: 3,
                                    duration: 0.5,
                                    opacity: 0
                                }
                            )
                        }
                    }
                )

                i++
            }
        }

        this.animation.play()
        window.setInterval(this.animation.play, 5000)
    }

    update()
    {
        // for(const _item of this.model.items)
        // {
        //     _item.material.opacity = Math.sin(this.time.elapsed * 0.002 - _item.index * 0.5) * 0.5 + 0.5
        // }
    }
}