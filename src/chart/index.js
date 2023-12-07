/* eslint-disable indent */
import './global.css'
import * as d3 from 'd3'
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

      this.displayRoot = null
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    stratify(seriesData) {
      return d3
        .stratify()
        .parentId(function (d) {
          return d.id.substring(0, d.id.lastIndexOf('.'))
        })(seriesData)
        .sum(function (d) {
          return d.value || 0
        })
        .sort(function (a, b) {
          return b.value - a.value
        })
    }

    overallLayout(params, api) {
      const context = params.context
      d3
        .pack()
        .size([api.getWidth() - 2, api.getHeight() - 2])
        .padding(3)(this.displayRoot)
      context.nodes = {}
      this.displayRoot.descendants().forEach(function (node) {
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
      if (!node || node.data.name !== params.seriesName) return

      const focus = new Uint32Array(
        node.descendants().map(function (node) {
          return node.data.index
        })
      )

      const z2 = api.value('depth') * 2
      return {
        type: 'circle',
        focus: focus,
        shape: { cx: node.x, cy: node.y, r: node.r },
        transition: ['shape'],
        z2: z2,
        textContent: {
          type: 'text',
          style: {
            text: node.depth <= 1 ? '' : node.data.label,
            fontFamily: 'Arial',
            width: node.r * 1.3,
            overflow: 'truncate',
            fontSize: node.r / 3,
            color: 'white'
          },

          emphasis: {
            style: {
              overflow: null,
              fontSize: Math.max(node.r / 3, 12)
            }
          }
        },
        textConfig: {
          position: 'inside'
        },
        style: {
          fill: node.data.color
        }
      }
    }

    initChart(seriesData, maxDepth, chartInstance) {
      this.displayRoot = this.stratify(seriesData)
      const option = {
        dataset: { source: seriesData },
        legend: {
          data: this.parserData.legendData,
          bottom: 0,
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 10, color: 'white' }
        },
        tooltip: {
          trigger: 'item',
          formatter: (e) => {
            let el = ''
            if (e.value?.value) {
              el = `<div>${e.value?.value ?? ''}</div>`
            }
            return el
          }
        },
        hoverLayerThreshold: Infinity,
        series: this.parserData.legendData.map((legend) => {
          return {
            type: 'custom',
            name: legend.name,
            renderItem: (params, api) => {
              return this.renderItem(params, api)
            },
            coordinateSystem: 'none'
          }
        })
      }
      chartInstance.setOption(option)
    }

    renderChart() {
      const container = `<div id="${this.chartInstanceId}" class="common-chart__container"></div>`
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
      this.el.innerHTML = `<div class="common-cpn__wrapper">${domEls}</div>`
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }
  }

  return Basic
}
