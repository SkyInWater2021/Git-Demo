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
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: (e) => {
            const { dataIndex } = e[0]
            const {
              collectionData,
              downCollectionData,
              distributeData,
              downloadDistributeData
            } = this.parserData

            const el1 = `<div>收集个数: ${
              collectionData[dataIndex] ?? 0
            }M</div>`
            const el2 = `<div>分发个数: ${
              distributeData[dataIndex] ?? 0
            }M</div>`
            const el3 = `<div>收集文件量: ${
              downCollectionData[dataIndex] ?? 0
            }万</div>`
            const el4 = `<div>分发文件量: ${
              downloadDistributeData[dataIndex] ?? 0
            }万</div>`

            return el1 + el2 + el3 + el4
          }
        },
        grid: { left: '10%', right: '10%', bottom: 20, top: 40 },
        legend: [
          {
            data: ['收集个数', '分发个数', '收集文件量', '分发文件量'],
            top: 0,
            itemWidth: 24,
            itemHeight: 12,
            textStyle: {
              fontSize: 12,
              color: 'white'
            }
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
            axisLine: {
              lineStyle: {
                color: '#3e7fce'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位(M)',
            nameTextStyle: {
              color: '#6DB5D7'
            },
            axisTick: { show: false },
            axisLabel: { color: '#6DB5D7' },
            axisLine: { lineStyle: { color: '#6DB5D7' } },
            splitLine: { show: true, lineStyle: { color: '#6DB5D7' } }
          },
          {
            type: 'value',
            name: '单位(万)',
            axisTick: { show: false },
            axisLabel: { color: '#6DB5D7' },
            axisLine: { lineStyle: { color: '#6DB5D7' } },
            splitLine: { show: true, lineStyle: { color: '#6DB5D7' } }
          }
        ],

        series: [
          {
            name: '收集个数',
            type: 'bar',
            data: this.parserData.collectionData,
            barGap: 1,
            barWidth: 12,
            showBackground: true,
            backgroundStyle: { opacity: 0.5 },
            label: {
              show: true,
              position: 'outside',
              distance: 0,
              fontSize: 4,
              color: 'rgba(0,0,0,0)',
              backgroundColor: '#d9f4f5',
              shadowBlur: 6,
              shadowColor: 'white'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: '#3f8bf4' },
                { offset: 0.5, color: '#3f8bf4' },
                { offset: 1, color: '#84e2fb' }
              ]),
              shadowColor: 'white',
              shadowBlur: 1
            }
          },
          {
            name: '分发个数',
            type: 'bar',
            data: this.parserData.distributeData,
            barWidth: 12,
            barGap: 1,
            showBackground: true,
            backgroundStyle: { opacity: 0.5 },
            label: {
              show: true,
              position: 'outside',
              distance: 0,
              fontSize: 4,
              color: 'rgba(0,0,0,0)',
              backgroundColor: '#d9f4f5',
              shadowBlur: 6,
              shadowColor: 'white'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: '#4fad89' },
                { offset: 0.5, color: '#4fad89' },
                { offset: 1, color: '#93fbf8' }
              ])
            }
          },
          {
            name: '收集文件量',
            type: 'line',
            symbol: 'none',
            yAxisIndex: 1,
            data: this.parserData.downCollectionData,
            itemStyle: { color: '#5397c5' }
          },
          {
            name: '分发文件量',
            type: 'line',
            symbol: 'none',
            yAxisIndex: 1,
            itemStyle: { color: '#e4cb5d' },
            data: this.downloadDistributeData
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
