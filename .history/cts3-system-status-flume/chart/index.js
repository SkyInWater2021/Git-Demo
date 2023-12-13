import './global.css'
import * as echarts from 'echarts'
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
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    getChartOption() {
      const colors = ['#22DFFF', '#A869FE', '#FFBA00', '#e27792']

      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          formatter: (e) => {
            let date = ''
            let els = ''
            e.forEach((item, index) => {
              const { seriesIndex, dataIndex, marker, value } = item
              const nodeName = this.parserData.nodes[seriesIndex]
              date = `<div>${this.parserData.xAxisData[dataIndex]}</div>`
              els += `<div>${marker} ${nodeName}：${value}%</div>`
            })

            return date + els
          }
        },
        legend: [
          {
            data: this.parserData.nodes,
            top: 20,
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
            splitLine: { show: true, lineStyle: { color: '#6DB5D733' } },
            data: this.parserData.xAxisData.map((item) => item.slice(11, 13))
          }
        ],

        yAxis: [
          {
            type: 'value',
            name: '单位(%)',
            nameTextStyle: { color: '#6DB5D7' },
            nameLocation: 'middle',
            nameGap: 30,
            axisLabel: { color: '#6DB5D7' },
            axisLine: {
              lineStyle: { color: '#6DB5D733' }
            },
            splitLine: { show: true, lineStyle: { color: '#6DB5D733' } }
          }
        ],

        series: this.parserData.nodes.map((nodeName, index) => {
          const color = colors[index % colors.length]
          return {
            name: nodeName,
            type: 'line',
            showSymbol: false,
            lineStyle: { width: 2, color },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: `${color}99` },
                { offset: 1, color: 'transparent' }
              ])
            },
            data: this.parserData.seriesData[nodeName]?.data ?? []
          }
        })
      }
      return option
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
      this.el.innerHTML = `<div style="width: 100%;height: 100%;">
       ${domEls}
      </div>`
    }

    resize({ width, height }) {
      // width:410 height:190
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }
  }

  return Basic
}
