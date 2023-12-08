import './global.css'
import * as echarts from 'echarts'
import { icon } from '../imgs/icon'
import { randomString } from '../utils'
import { defaultData, handleData, formatFileSize } from '../getParser'

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
      const { originData } = this.parserData
      const dataTypes = originData['DATA_TYPE'].data
      const totals = originData['FILESIZE_COUNT'].data
      const emptyIndex = dataTypes.findIndex((item) => !item)

      let startIndex = 0
      let endIndex = dataTypes.length - 1
      if (emptyIndex === startIndex) startIndex++
      if (emptyIndex === endIndex) endIndex--

      const sum = totals.reduce((acc, cur, index) => {
        if (index !== emptyIndex) acc += cur
        return acc
      }, 0)

      let _allCustomValue = 0

      const series = dataTypes
        .map((item, index) => {
          if (!item) return
          let borderRadius = [0, 0, 0, 0]
          if (index === startIndex) borderRadius = [20, 0, 0, 20]
          if (index === endIndex) borderRadius = [0, 20, 20, 0]
          const _present = originData['FILESIZE_COUNT'].data[index] / sum
          const _customValue =
            _present < 0.05 ? 0.05 : _present > 0.7 ? 0.7 : _present
          _allCustomValue += _customValue

          return {
            data: [_customValue],
            _dataType: item,
            _average: originData['FILESIZE_AVG'].data[index],
            _total: originData['FILESIZE_COUNT'].data[index],
            emphasis: { focus: 'series' },
            type: 'bar',
            stack: 'total',
            name: item,
            barWidth: 10,
            itemStyle: { borderRadius }
          }
        })
        .filter(Boolean)

      const option = {
        tooltip: {
          trigger: 'item',
          type: 'shadow',
          formatter: (e) => {
            const { marker, seriesIndex } = e
            const total = formatFileSize(series[seriesIndex]._total)
            const average = formatFileSize(series[seriesIndex]._average)
            const type = series[seriesIndex]._dataType
            const format = `
            <div>${marker} 类型: ${type}</div>
            <div>${marker} 总量: ${total}</div>
            <div>${marker} 平均量: ${average}</div>
            `
            return format
          }
        },
        grid: { left: 0, right: 0, bottom: 0, top: 0 },
        xAxis: {
          type: 'value',
          show: false,
          max: _allCustomValue
        },
        yAxis: { type: 'category', show: false },
        series
      }

      return option
    }

    renderChart() {
      const height = '10px'
      const container = `<div id="${this.chartInstanceId}" style="width:100%;height:${height};margin:6px 0;"></div>`
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

    renderTotal() {
      const { total, wavePercentage } = this.parserData

      let totalEls = ''
      total
        .split('')
        .filter((item) => item !== ' ')
        .forEach((item) => {
          totalEls += `<div class="total-chart__item" >${item}</div>`
        })

      // TODO 根据后端返回的异常来判断,而不是小于0就是异常
      const wavePercentageEl = `<div class="total-wave" style="color:${
        wavePercentage < 0 ? '#db6e66' : '#5cc78f'
      }">${wavePercentage}%</div>`

      return `
      <div class="total-current">
        <div class="total-chart">${totalEls}</div>
          ${wavePercentageEl}
      </div>`
    }

    renderAverage() {
      const iconEl = `<img src="${icon}"/>`
      const valueEl = `<span>上月平均量：${this.parserData.average}</span>`
      return `<div class="average-container">${iconEl + valueEl}</div>`
    }

    render() {
      console.log('🍊🍊🍊🍊render调用🍊🍊🍊🍊')
      this.el.innerHTML = ''
      let domEls = ''
      domEls += this.renderTotal()
      domEls += this.renderChart()
      domEls += this.renderAverage()
      this.el.innerHTML = `<div style="width:100%;height:100%;box-sizing: border-box;">
        <div class="cts3-yesterday__wrapper_two">${domEls}</div>
      </div>`
    }

    resize({ width, height }) {
      // width:250 height:75
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
