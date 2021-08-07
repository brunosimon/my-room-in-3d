import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    /**
     * Constructor
     */
    constructor()
    {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.playing = true

        this.tick = this.tick.bind(this)
        this.tick()
    }

    play()
    {
        this.playing = true
    }

    pause()
    {
        this.playing = false
    }

    /**
     * Tick
     */
    tick()
    {
        this.ticker = window.requestAnimationFrame(this.tick)

        const current = Date.now()

        this.delta = current - this.current
        this.elapsed += this.playing ? this.delta : 0
        this.current = current

        if(this.delta > 60)
        {
            this.delta = 60
        }

        if(this.playing)
        {
            this.trigger('tick')
        }
    }

    /**
     * Stop
     */
    stop()
    {
        window.cancelAnimationFrame(this.ticker)
    }
}
