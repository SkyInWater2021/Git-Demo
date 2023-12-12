import * as echarts from 'echarts'
import { randomString } from '../utils'
import { circle } from '../imgs/circle'
import { defaultData, handleData } from '../getParser'
import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.chartInstance = []
      this.chartInstanceId = [
        randomString(),
        randomString(),
        randomString(),
        randomString()
      ]

      this.parserData = handleData(defaultData)

      this.styleConfig = {}
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    getChartOption(data) {
      const value = data * 100

      const option = {
        title: {
          text: `${value}%`,
          x: 'center',
          top: 'center',
          textStyle: { fontSize: '14', color: 'white' }
        },
        tooltip: {
          formatter: (e) => {
            return `<div>日期：${this.parserData.pieData[0].date}</div>`
          }
        },
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: { show: false },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: '#068DFE' },
                  { offset: 1, color: '#00FF9C' }
                ])
              }
            },
            axisLine: {
              lineStyle: {
                width: 8,
                color: [[1, '#073E61']]
              }
            },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            details: { show: false },
            detail: { show: false },
            data: [value]
          }
        ]
      }

      return option
    }

    renderChart(index) {
      const container = `<div id="${this.chartInstanceId[index]}" style="width:100%;height:100%"></div>`
      const timer = setInterval(() => {
        const el = document.getElementById(this.chartInstanceId[index])
        if (el) {
          clearInterval(timer)
          el.removeAttribute('_echarts_instance_')
          el.innerHTML = ''
          this.chartInstance[index] = echarts.init(el)
          this.chartInstance[index].setOption(
            this.getChartOption(this.parserData.pieData[index].value)
          )
          this.chartInstance[index].resize()
        }
      })

      return container
    }

    renderSystemStatus() {
      let els = ''
      this.parserData.pieData.forEach((item, index) => {
        els += `<div class="pie-box">
                <div class="pie-title">${item.label}</div>
                <div class="pie-chart">${this.renderChart(index)}
                  <div class="center-img" style="background-image:url(${circle})"></div>
                </div>
              </div>`
      })

      return `<div class="pie-item__container">${els}</div>`
    }

    render() {
      this.el.innerHTML = ''
      let domEls = ''
      domEls += this.renderSystemStatus()
      this.el.innerHTML = `<div style="width:100%;height:100%;box-sizing: border-box;">
        <div class="cts3-systemStatus__wrapper_two">${domEls}</div>
      </div>`
    }

    resize({ width, height }) {
      // width:385 height:110
      this.el.style.cssText += `;width:${385}px;height:${110}px;`
    }

    setSeriesStyle(config) {
      this.styleConfig.left = config.gridLeft
      this.styleConfig.right = config.gridRight
    }

    setOption() {}

    destroy() {}
  }

  return Basic
}
