import echarts from 'echarts'
import { handleData, dataKeyMap, formatNumberAsGigabytes } from '../getParser'
import { icon } from '../imgs/icon'
import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el
      this.barInstance = null
      this.parserData = handleData()

      this.BAR_ID = Date.now()
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    getBarOption() {
      const data = this.parserData.originData
      const types = data[dataKeyMap.dataType].data
      const totals = data[dataKeyMap.total].data
      const totalKey = dataKeyMap['total']
      const averageKey = dataKeyMap['average']

      const emptyIndex = types.findIndex((item) => !item)
      let startIndex = 0
      let endStartIndex = types.length - 1
      if (emptyIndex === startIndex) startIndex++
      if (emptyIndex === endStartIndex) endStartIndex--

      const sum = totals.reduce((acc, cur, index) => {
        if (index !== emptyIndex) acc += cur
        return acc
      }, 0)

      let _allCustomValue = 0
      const series = types
        .map((item, index) => {
          if (!item) return
          let borderRadius = [0, 0, 0, 0]
          if (index === startIndex) borderRadius = [20, 0, 0, 20]
          if (index === endStartIndex) borderRadius = [0, 20, 20, 0]

          const _present = data[totalKey].data[index] / sum
          const _customValue =
            _present < 0.05 ? 0.05 : _present > 0.7 ? 0.7 : _present
          _allCustomValue += _customValue

          return {
            data: [_customValue],
            _dataType: item,
            _average: data[averageKey].data[index],
            _total: data[totalKey].data[index],
            emphasis: { focus: 'series' },
            type: 'bar',
            stack: 'total',
            name: item,
            barWidth: 12,
            itemStyle: { barBorderRadius: borderRadius }
          }
        })
        .filter(Boolean)

      const option = {
        tooltip: {
          trigger: 'item',
          type: 'shadow',
          formatter: (e) => {
            const { marker, seriesIndex } = e
            const total = formatNumberAsGigabytes(series[seriesIndex]._total)
            const average = formatNumberAsGigabytes(
              series[seriesIndex]._average
            )

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

    renderTotal() {
      const { total, wavePercentage } = this.parserData
      let totalEls = ''
      total.split('').forEach((item) => {
        totalEls += `<div class="total-chart__item" >${item}</div>`
      })

      const wavePercentageEl = `<div class="total-wave ${
        wavePercentage < 0 ? 'total-wave__down' : 'total-wave__up'
      } ">
      <div>${Math.abs(wavePercentage)}%</div>
      </div>`

      const html = `
      <div class="total-current">
      <div class="total-chart">${totalEls}</div>
      ${wavePercentageEl}
      </div>
      `
      return html
    }

    renderBar() {
      const container = `<div id="${this.BAR_ID}" class="bar-wrapper"></div>`

      const timer = setInterval(() => {
        const el = document.getElementById(this.BAR_ID)
        if (el) {
          clearInterval(timer)
          el.removeAttribute('_echarts_instance_')
          el.innerHTML = ''
          this.barInstance = echarts.init(el)
          this.barInstance.setOption(this.getBarOption())
          this.barInstance.resize()
        }
      })

      return container
    }

    renderAverage() {
      const iconEl = `<img src="${icon}"/>`
      const valueEl = `<span>上月平均量：${this.parserData.average}</span>`
      return `<div class="average-container">${iconEl + valueEl}</div>`
    }

    render() {
      this.el.innerHTML = ''

      let domEls = ''
      domEls += this.renderTotal()
      domEls += this.renderBar()
      domEls += this.renderAverage()
      this.el.innerHTML = `<div class="custom-cpn__wrapper">${domEls}</div>`
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
      if (this.barInstance) {
        this.barInstance.resize()
      }
    }

    setOption(option) {}

    setSeriesStyle(__seriesStyle) {}

    destroy() {}
  }

  return Basic
}
