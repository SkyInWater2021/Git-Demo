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
      const data = [
        100, 105, 110, 105, 100, 120, 110, 120, 110, 111, 126, 100, 105, 110,
        105, 100, 120, 110, 120, 110, 111, 126, 100, 105, 110, 105, 100, 120,
        110, 120, 110, 111, 126, 100, 105, 110, 105, 100, 120, 110, 120, 110,
        111, 126
      ]

      const colors = ['#22DFFF', '#A869FE', '#FFBA00']

      const option = {
        color: colors,

        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        legend: [
          {
            data: ['Line1', 'Line2', 'Line3'],
            top: 10,
            textStyle: { color: 'white' }
          }
        ],
        grid: { left: 50, right: 10, bottom: 20, top: 50 },
        xAxis: [
          {
            type: 'category',
            axisPointer: { type: 'shadow' },
            axisLabel: { color: 'white' },
            axisTick: { show: false },
            axisLine: {
              lineStyle: { color: '#3e7fce' }
            },
            splitLine: { show: true, lineStyle: { color: '#6DB5D7' } },
            data: data
          }
        ],

        yAxis: [
          {
            type: 'value',
            axisLabel: { color: '#6DB5D7' },
            axisLine: {
              lineStyle: { color: '#6DB5D7' }
            },
            splitLine: { show: true, lineStyle: { color: '#6DB5D7' } }
          }
        ],

        series: [
          {
            name: 'Line1',
            type: 'line',
            showSymbol: false,
            lineStyle: { width: 2, color: colors[0] },
            areaStyle: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors[0] },
                { offset: 1, color: 'transparent' }
              ])
            },
            data: data.map((item) => item + 20)
          },
          {
            name: 'Line2',
            type: 'line',
            showSymbol: false,
            lineStyle: { width: 2, color: colors[1] },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors[1] },
                { offset: 1, color: 'transparent' }
              ])
            },
            data: data.map((item) => item - 20)
          },
          {
            name: 'Line3',
            type: 'line',
            showSymbol: false,
            lineStyle: { width: 2, color: colors[2] },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors[2] },
                { offset: 1, color: 'transparent' }
              ])
            },
            data: data.map((item) => item)
          }
        ]
      }
      return option
    }

    renderChart() {
      const id = this.randomString(10) + 'cts3_live_bar'
      const container = `<div id="${id}" class="common-chart__container"></div>`

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

      this.el.innerHTML = `<div class="common-cpn__wrapper">${domEls}</div>`
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
