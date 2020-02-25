import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'

export default class Template extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 100 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
  }

  hooks () {
    this.sync.on('tatum', tatum => {
      this.beatColor = this.theme[0]
    })

    this.sync.on('segment', segment => {
      this.segmentColor = this.theme[1]
    })

    this.sync.on('beat', beat => {
      this.beatColor = this.theme[2]
    })

    this.sync.on('bar', bar => {
      this.barColor = this.theme[3]
    })

    this.sync.on('section', section => {
      this.sectionColor = this.theme[4]
    })

  }

  paint ({ ctx, height, width, now }) {
    // this.sync.volume
    // this.sync.tatum
    // this.sync.segment
    // this.sync.beat
    // this.sync.bar
    // this.sync.section
    ctx.fillStyle = 'rgba(0, 0, 0, .08)'
    ctx.fillRect(0, 0, width, height)


    ctx.beginPath()
    const tatum = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.tatum.progress)
    ctx.lineWidth = tatum
    ctx.strokeStyle = '#18FF2A'
    ctx.moveTo(0, height/6)
    ctx.lineTo(width, height/6)
    ctx.moveTo(width/2, height/6)
    ctx.stroke()

    ctx.beginPath()
    const segment = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.segment.progress)
    ctx.lineWidth = segment
    ctx.strokeStyle = '#7718FF'
    ctx.moveTo(0, 2*height/6)
    ctx.lineTo(width, height/3)
    ctx.moveTo(width/2, 2*height/6)
    ctx.stroke()

    ctx.beginPath()
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    ctx.lineWidth = beat
    ctx.strokeStyle = '#06C5FE'
    ctx.moveTo(0, 3*height/6)
    ctx.lineTo(width, height/2)
    ctx.stroke()

    ctx.beginPath()
    const bar = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.bar.progress)
    ctx.lineWidth = bar
    ctx.strokeStyle = '#FF4242'
    ctx.moveTo(0, 4*height/6)
    ctx.lineTo(width, 2*height/3)
    ctx.moveTo(width/2, 4*height/6)
    ctx.stroke()

    ctx.beginPath()
    const section = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.section.progress)
    ctx.lineWidth = section
    ctx.strokeStyle = '#AAFF2A'
    ctx.moveTo(0, 5*height/6)
    ctx.lineTo(width, 5*height/6)
    ctx.moveTo(width/2, 5*height/6)
    ctx.stroke()
  }
}
