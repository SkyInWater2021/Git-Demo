import './global.css'
import * as d3 from 'd3'
import * as echarts from 'echarts'
import { randomString, formatTime } from '../utils'
import { defaultData, handleData } from '../getParser'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.chartInstance = null
      this.chartInstanceId = randomString()

      this.parserData = handleData(defaultData)

      this.displayRoot = null
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    drillDown(targetNodeId) {
      this.displayRoot = this.stratify(this.parserData.seriesData)

      if (targetNodeId) {
        this.displayRoot = this.displayRoot.descendants().find(function (node) {
          return node.data.id === targetNodeId
        })
      }
      this.displayRoot.parent = null
      this.chartInstance.setOption({
        dataset: { source: this.parserData.seriesData }
      })
    }

    stratify(seriesData) {
      const res = d3
        .stratify()
        .parentId(function (d) {
          return d.id.substring(0, d.id.lastIndexOf('.'))
        })(seriesData)
        .sum(function (d) {
          const value = d.value | 0
          return value
        })
        .sort(function (a, b) {
          return Math.random() - Math.random()
        })

      return res
    }

    overallLayout(params, api) {
      const context = params.context
      const fn = d3
        .pack()
        .size([api.getWidth(), api.getHeight()])
        .padding((e) => (e.depth === 0 ? 10 : 5))

      fn(this.displayRoot)

      context.nodes = {}

      this.displayRoot.descendants().forEach(function (node) {
        if (node.depth === 1) {
          node.r *= 1.2
        }

        context.nodes[node.id] = node
      })
    }

    renderItem(params, api) {
      const context = params.context
      if (!context.layout) {
        context.layout = true
        this.overallLayout(params, api)
      }
      const nodePath = api.value('id')
      const node = context.nodes[nodePath]
      if (!node) return

      const focus = new Uint32Array(
        node.descendants().map((node) => node.data.index)
      )

      const z2 = node.data.depth * 2
      return {
        type: 'circle',
        z2,
        focus: focus,
        transition: ['shape'],
        shape: { cx: node.x, cy: node.y, r: node.r },
        textContent: {
          type: 'text',
          style: {
            fill: 'white',
            text: node.depth <= 1 ? '' : node.data.label,
            width: node.r * 1.3,
            overflow: node.r > 10 ? '' : 'truncate',
            fontSize: node.r > 10 ? node.r / 2 : node.r / 3
          },
          emphasis: {
            style: {
              overflow: null,
              text: node.data.label,
              fontSize: Math.max(node.r / 1.5, 12)
            }
          }
        },
        textConfig: { position: 'inside', color: 'white' },
        style: { fill: node.data._bColor }
      }
    }

    initChart(seriesData, _, chartInstance) {
      this.displayRoot = this.stratify(seriesData)

      const option = {
        dataset: { source: seriesData },
        tooltip: {
          trigger: 'item',
          formatter: (e) => {
            const { marker } = e
            let el = ''
            if (e.value?.value) {
              const { dataIndex, index } = e.data

              el += `<div style="text-align:center;font-size:18px;font-weight:600;">
                ${this.parserData.originData['DATA_TYPE_FIRST_NAME'].data[dataIndex]}
              </div>`

              if (this.parserData?.seriesData?.[index]?.data) {
                el += `<div>${marker} ${this.parserData.seriesData[index].data['USER_ID_NAME']}_${this.parserData.seriesData[index].data['USER_ID']}
                </div>`
              }

              el += `<div>${marker} 日期：${formatTime(
                this.parserData.originData['PERIOD_DATE'].data[dataIndex]
              )}</div>`

              el += `<div>${marker} 一级编码：${this.parserData.originData['DATA_TYPE_FIRST'].data[dataIndex]}</div>`

              if (this.parserData?.seriesData?.[index]?.data) {
                el += `<div>${marker} 文件数：${this.parserData.seriesData[index].data['FILE_COUNT']}</div>`
                el += `<div>${marker} 文件量：${this.parserData.seriesData[index].data['FILESIZE_COUNT']}</div>`
              } else {
                el += `<div>${marker} 文件数：${this.parserData.originData['FILE_COUNT'].data[dataIndex]}</div>`
                el += `<div>${marker} 文件量：${this.parserData.originData['FILESIZE_COUNT'].data[dataIndex]}</div>`
              }
            }
            return el
          }
        },
        series: {
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: (params, api) => this.renderItem(params, api)
        },
        hoverLayerThreshold: Infinity
      }
      chartInstance.setOption(option)

      this.chartInstance.on('click', { seriesIndex: 0 }, (params) => {
        this.drillDown(params.data.id)
      })
      this.chartInstance.getZr().on('click', (event) => {
        if (!event.target) {
          this.drillDown()
        }
      })
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

          const { seriesData } = this.parserData
          this.initChart(seriesData, 2, this.chartInstance)
          this.chartInstance.resize()
        }
      })

      return container
    }

    render() {
      this.el.innerHTML = 'hello world'
      let domEls = ''
      domEls += this.renderChart()
      this.el.innerHTML = `<div style="width: 100%;height: 100%;">
        ${domEls}
      </div>`
    }

    resize({ width, height }) {
      // width:370 height:380
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }
  }

  return Basic
}
