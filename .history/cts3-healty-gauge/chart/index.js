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
      const value = 50

      const option = {
        title: [
          {
            text: `${value}%`,
            x: 'center',
            top: 'center',
            textStyle: { fontSize: '14', color: 'white' }
          }
        ],
        polar: {
          radius: ['100%', '75%'],
          center: ['50%', '50%']
        },
        angleAxis: {
          max: 100,
          show: false
        },
        radiusAxis: { type: 'category' },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            coordinateSystem: 'polar',
            showBackground: true,
            data: [value],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: '#068DFE' },
                  { offset: 1, color: '#00FF9C' }
                ])
              }
            }
          }
        ]
      }

      return option
    }

    renderChart() {
      const id = this.randomString(10) + 'cts3_live_bar'
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

    setSeriesStyle(__seriesStyle) {}

    destroy() {}
  }

  return Basic
}
