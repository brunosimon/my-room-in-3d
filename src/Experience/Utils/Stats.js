import StatsJs from 'stats.js'

export default class Stats
{
    constructor(_active)
    {
        this.instance = new StatsJs()
        this.instance.showPanel(3)

        this.active = false
        this.max = 40
        this.ignoreMaxed = true

        if(_active)
        {
            this.activate()
        }
    }

    activate()
    {
        this.active = true

        document.body.appendChild(this.instance.dom)
    }

    deactivate()
    {
        this.active = false

        document.body.removeChild(this.instance.dom)
    }

    setRenderPanel(_context)
    {
        this.render = {}
        this.render.context = _context
        this.render.extension = this.render.context.getExtension('EXT_disjoint_timer_query_webgl2')
        this.render.panel = this.instance.addPanel(new StatsJs.Panel('Render (ms)', '#f8f', '#212'))

        const webGL2 = typeof WebGL2RenderingContext !== 'undefined' && _context instanceof WebGL2RenderingContext

        if(!webGL2 || !this.render.extension)
        {
            this.deactivate()
        }
    }

    beforeRender()
    {
        if(!this.active)
        {
            return
        }

        // Setup
        this.queryCreated = false
        let queryResultAvailable = false

        // Test if query result available
        if(this.render.query)
        {
            queryResultAvailable = this.render.context.getQueryParameter(this.render.query, this.render.context.QUERY_RESULT_AVAILABLE)
            const disjoint = this.render.context.getParameter(this.render.extension.GPU_DISJOINT_EXT)
                
            if(queryResultAvailable && !disjoint)
            {
                const elapsedNanos = this.render.context.getQueryParameter(this.render.query, this.render.context.QUERY_RESULT)
                const panelValue = Math.min(elapsedNanos / 1000 / 1000, this.max)

                if(panelValue === this.max && this.ignoreMaxed)
                {
                    
                }
                else
                {
                    this.render.panel.update(panelValue, this.max)
                }
            }
        }

        // If query result available or no query yet
        if(queryResultAvailable || !this.render.query)
        {
            // Create new query
            this.queryCreated = true
            this.render.query = this.render.context.createQuery()
            this.render.context.beginQuery(this.render.extension.TIME_ELAPSED_EXT, this.render.query)
        }

    }

    afterRender()
    {
        if(!this.active)
        {
            return
        }
        
        // End the query (result will be available "later")
        if(this.queryCreated)
        {
            this.render.context.endQuery(this.render.extension.TIME_ELAPSED_EXT)
        }
    }

    update()
    {
        if(!this.active)
        {
            return
        }

        this.instance.update()
    }

    destroy()
    {
        this.deactivate()
    }
}