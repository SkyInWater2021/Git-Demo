import './global.css'
import * as d3 from 'd3'
import { randomString } from '../utils'
import { defaultData, handleData } from '../getParser'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.chartInstance = null
      this.chartInstanceId = randomString()

      this.parserData = handleData(defaultData)
      this.width = 370
      this.height = 380
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    initChart() {
      const svg = d3
        .select(`#${this.chartInstanceId}`)
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .style('background', 'transparent')

      // 创建分组
      const rootG = svg
        .append('g')
        .attr('transform', `translate(${this.width / 2},${this.height / 2})`)

      const groupG = rootG.append('g').attr('class', 'group')
      const chordG = rootG.append('g').attr('class', 'chords')

      const chords = d3
        .chord()
        .padAngle(0.1)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending)(this.parserData.population)

      const color = d3.scaleOrdinal(d3.schemeCategory10)
      const arc = d3.arc().innerRadius(100).outerRadius(120)
      const ribbon = d3.ribbon().radius(105) // 创建弦绘制器

      groupG
        .selectAll('path')
        .data(chords.groups)
        .enter()
        .append('path')
        .attr('fill', (d, i) => {
          if (i === 0) return '#63c4c7'
          return color(i)
        })
        .attr('d', arc)

      groupG
        .selectAll('.outerText')
        .data(chords.groups)
        .enter()
        .append('text')
        .each((d, i) => {
          d.angle = (d.startAngle + d.endAngle) / 2
          d.name = this.parserData.labelArr[i]
        })
        .attr('class', 'outerText')
        .attr('dy', '.2em')
        .style('fill', '#CBEEFF')
        .attr('transform', function (d) {
          const jd = (d.angle * 180) / Math.PI
          // 字体本来是水平的，所以旋转角度需要 - 90
          return (
            'rotate(' +
            (jd - 90) +
            ')' +
            'translate(' +
            (jd >= 180 ? 155 : 130) +
            ')' +
            (d.angle > Math.PI ? 'rotate(180)' : '')
          )
        })
        .text(function (d) {
          return d.name
        })

      chordG
        .selectAll('path')
        .data(chords)
        .enter()
        .append('path')
        .attr('fill', function (d, i) {
          // return `#98dbde`
          return `${color(i)}88`
        })
        .attr('d', ribbon)
    }

    renderChart() {
      const container = `<div id="${this.chartInstanceId}" style="box-sizing: border-box;
      width: 100%;height: 100%;"></div>`

      const timer = setInterval(() => {
        const el = document.getElementById(this.chartInstanceId)
        if (el) {
          clearInterval(timer)
          el.removeAttribute('_echarts_instance_')
          el.innerHTML = ''
          this.initChart()
        }
      })

      return container
    }

    render() {
      this.el.innerHTML = ''
      let domEls = ''
      domEls += this.renderChart()
      this.el.innerHTML = `<div style="width: 100%;height: 100%;">
       <div class="cts3-dataVolume__wrapper_two">${domEls}</div>
      </div>`
    }

    resize({ width, height }) {
      // width:370 height:380
      this.el.style.cssText += `;width:${370}px;height:${380}px;`
      this.width = 370
      this.height = 380
    }
  }

  return Basic
}
