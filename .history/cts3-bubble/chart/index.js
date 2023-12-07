import echarts from 'echarts'
import { handleData } from '../getParser'
import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el
      this.chartInstance = null

      this.parserData = handleData()
      this.gravity = 0.15
    }

    randomString(len) {
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
      const maxPos = chars.length
      let str = ''
      for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return str
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    getChartOption() {
      const option = {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        legend: [
          {
            data: this.parserData.legendData,
            bottom: 0,
            icon: 'circle',
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
              fontSize: 12,
              color: 'white'
            }
          }
        ],
        series: [
          {
            name: 'bubble',
            type: 'graph',
            layout: 'force',
            draggable: true,
            roam: true,
            label: { show: false, color: 'white', fontSize: 12 },
            labelLayout: { align: 'center', moveOverlap: true, fontSize: 22 },
            data: this.parserData.seriesData,
            categories: this.parserData.categoryData,
            emphasis: {
              label: { align: 'center', show: true }
            },
            force: {
              repulsion: 50,
              gravity: this.gravity
            }
          }
        ]
      }

      return option
    }

    renderChart() {
      const id = this.randomString(10) + 'cts3_bubble'
      const container = `<div id="${id}" class="chart-container"></div>`
      const timer = setInterval(() => {
        const el = document.getElementById(id)
        if (el) {
          clearInterval(timer)
          el.removeAttribute('_echarts_instance_')
          el.innerHTML = ''
          this.chartInstance = echarts.init(el)
          this.chartInstance.setOption(this.getChartOption())
          this.chartInstance.resize()
        }
      })

      return container
    }

    render() {
      this.el.innerHTML = ''

      let domEls = ''
      domEls += this.renderChart()

      this.el.innerHTML = `<div class="custom-cpn__wrapper">${domEls}</div>`
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    }

    setOption() {}

    setSeriesStyle(__seriesStyle) {
      const { size, gravity } = __seriesStyle
      this.gravity = gravity

      this.parserData.seriesData.forEach((item) => {
        item.symbolSize = item.symbolSize * size
      })

      this.render()
    }

    destroy() {}
  }

  return Basic
}
