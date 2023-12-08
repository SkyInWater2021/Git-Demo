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

      this.styleConfig = {}
    }

    setData(data) {
      console.log('🍌🍌🍌setData调用🍌🍌🍌')
      this.parserData = data
      this.render()
    }

    getChartOption() {
      const barConfig = {
        type: 'bar',
        barGap: 1,
        barWidth: 10,
        showBackground: true,
        backgroundStyle: { opacity: 0.5 },
        label: {
          show: true,
          position: 'outside',
          distance: 0,
          width: 16,
          height: 3,
          color: 'transparent',
          backgroundColor: '#d9f4f5',
          shadowBlur: 6,
          shadowColor: 'white'
        },
        shadowColor: 'white',
        shadowBlur: 1
      }
      const yAxisConfig = {
        type: 'value',
        axisTick: { show: false },
        axisLabel: { color: '#6DB5D7' },
        axisLine: { lineStyle: { color: '#6DB5D733' }, show: true },
        splitLine: { show: true, lineStyle: { color: '#6DB5D733' } }
      }

      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: (e) => {
            const { dataIndex, marker } = e[0]
            const {
              collectionData,
              downCollectionData,
              distributeData,
              downloadDistributeData
            } = this.parserData

            const date = String(this.parserData.xAxisData[dataIndex])
            const year = date.slice(0, 4) + '年'
            const month = date.slice(4, 6) + '月'
            const day = date.slice(6, 8) + '日'
            const hour = date.slice(8) + '时'

            const dateEl = `<div>日期: ${year + month + day + hour}</div>`
            const el1 = `<div>${marker}收集个数: ${
              collectionData[dataIndex] ?? 0
            }</div>`
            const el2 = `<div>${marker}分发个数: ${
              distributeData[dataIndex] ?? 0
            }</div>`
            const el3 = `<div>${marker}收集文件量: ${
              downCollectionData[dataIndex] ?? 0
            } Byte</div>`
            const el4 = `<div>${marker}分发文件量: ${
              downloadDistributeData[dataIndex] ?? 0
            } Byte</div>`

            return dateEl + el1 + el2 + el3 + el4
          }
        },
        grid: {
          left: this.styleConfig.left,
          right: this.styleConfig.right,
          bottom: 20,
          top: 30
        },
        legend: [
          {
            data: ['收集个数', '分发个数', '收集文件量', '分发文件量'],
            top: 0,
            itemWidth: 22,
            itemHeight: 10,
            textStyle: { fontSize: 12, color: 'white' }
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisPointer: { type: 'shadow' },
            axisLabel: { color: 'white' },
            data: this.parserData.xAxisData.map((item) => {
              const str = String(item)
              return str.slice(str.length - 2)
            }),
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#3e7fce' } }
          }
        ],
        yAxis: [yAxisConfig, { ...yAxisConfig, splitLine: { show: false } }],
        series: [
          {
            ...barConfig,
            name: '收集个数',
            data: this.parserData.collectionData,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: '#068DFE' },
                { offset: 1, color: '#2FDEFF' }
              ])
            }
          },
          {
            ...barConfig,
            name: '分发个数',
            data: this.parserData.distributeData,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: '#00AE83' },
                { offset: 1, color: '#38FFF8' }
              ])
            }
          },
          {
            name: '收集文件量',
            type: 'line',
            symbol: 'none',
            yAxisIndex: 1,
            data: this.parserData.downCollectionData,
            itemStyle: { color: '#22DFFF' }
          },
          {
            name: '分发文件量',
            type: 'line',
            symbol: 'none',
            yAxisIndex: 1,
            itemStyle: { color: '#FFC600' },
            data: this.downloadDistributeData
          }
        ]
      }

      return option
    }

    renderChart() {
      const container = `<div id="${this.chartInstanceId}" style="width:100%;height:100%"></div>`
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
      console.log('🍊🍊🍊🍊render调用🍊🍊🍊🍊')
      this.el.innerHTML = ''
      let domEls = ''
      domEls += this.renderChart()
      this.el.innerHTML = `<div style="width:100%;height:100%;box-sizing: border-box;">
        ${domEls}
      </div>`
    }

    resize({ width, height }) {
      // width:868 height:200
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
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
