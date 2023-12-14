import { randomString } from '../utils'
import { defaultData, handleData } from '../getParser'
import './global.css'

import * as Highcharts from 'highcharts'
import HC_sankey from 'highcharts/modules/sankey'
import HC_depwheel from 'highcharts/modules/dependency-wheel'

HC_sankey(Highcharts)
HC_depwheel(Highcharts)

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.chartInstance = ''
      this.chartInstanceId = randomString()

      this.parserData = handleData(defaultData)
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    initChart() {
      Highcharts.chart(this.chartInstanceId, {
        title: { text: '' },
        chart: { backgroundColor: 'transparent' },
        tooltip: {},
        credits: { enabled: false },
        series: [
          {
            keys: ['from', 'to', 'weight', 'name'],
            data: this.parserData.chordData,
            type: 'dependencywheel',
            name: '数据收集总量',
            dataLabels: {
              color: 'white',
              style: { textOutline: 'none' },
              textPath: { enabled: true }
            },
            size: '100%'
          }
        ]
      })
    }

    renderChart() {
      const container = `<div id="${this.chartInstanceId}" style="width:100%;height:100%"></div>`
      const timer = setInterval(() => {
        const el = document.getElementById(this.chartInstanceId)
        if (el) {
          clearInterval(timer)
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
      this.el.innerHTML = `<div style="width:100%;height:100%;box-sizing: border-box;">
        ${domEls}
      </div>`
    }

    resize({ width, height }) {
      // width:385 height:110
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    setSeriesStyle(config) {}

    setOption() {}

    destroy() {}
  }

  return Basic
}
