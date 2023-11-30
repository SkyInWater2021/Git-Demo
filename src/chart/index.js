import echarts from 'echarts'
import { handleData, dataKeyMap, formatNumberAsGigabytes } from '../getParser'
import { icon } from '../imgs/icon'
import './global.css'

const BAR_ID = '_self_total_bar_id'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el
      this.barInstance = null
      this.parserData = handleData()
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    getBarOption() {
      const data = this.parserData.originData
      const types = data['DATA_TYPE'].data
      const totalKey = dataKeyMap['total']
      const averageKey = dataKeyMap['average']

      const emptyIndex = types.findIndex((item) => !item)
      let startIndex = 0
      let endStartIndex = types.length - 1
      if (emptyIndex === startIndex) startIndex++
      if (emptyIndex === endStartIndex) endStartIndex--

      const series = types
        .map((item, index) => {
          if (!item) return

          let borderRadius = [0, 0, 0, 0]
          if (index === startIndex) borderRadius = [20, 0, 0, 20]
          if (index === endStartIndex) borderRadius = [0, 20, 20, 0]

          return {
            data: [data[totalKey].data[index]],
            _dataType: item,
            _average: data[averageKey].data[index],
            emphasis: { focus: 'series' },
            type: 'bar',
            stack: 'total',
            name: item,
            barMinHeight: 10,
            barWidth: 20,
            itemStyle: {
              normal: { barBorderRadius: borderRadius }
            }
          }
        })
        .filter(Boolean)

      const option = {
        tooltip: {
          trigger: 'item',
          type: 'shadow',
          formatter: (e) => {
            const { marker, data, seriesIndex } = e
            const total = formatNumberAsGigabytes(data)
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
        xAxis: { type: 'value', show: false },
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

      const wavePercentageEl =
        wavePercentage < 0
          ? `<div class="total-wave total-wave__down">
      <div class="total-wave__icon total-wave__down">↓</div>
      <div>${Math.abs(wavePercentage)}%</div>
      </div>`
          : `<div class="total-wave total-wave__up">
      <div class="total-wave__icon total-wave__up">↑</div>
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
      const container = `<div id="${BAR_ID}" class="bar-wrapper"></div>`

      const timer = setInterval(() => {
        const el = document.getElementById(BAR_ID)
        if (el) {
          clearInterval(timer)
          el.removeAttribute('_echarts_instance_')
          el.innerHTML = ''
          this.barInstance = echarts.init(el)
          this.barInstance.setOption(this.getBarOption())
        }
      })

      return container
    }

    renderAverage() {
      const iconEl = `<img src="${icon}"/>`
      const valueEl = `<span>上月平均量：${this.parserData.average}</span>`

      return `<div class="average-container">
              ${iconEl}
              ${valueEl}
              </div>`
    }

    render() {
      let domEls = ''
      domEls += this.renderTotal()
      domEls += this.renderBar()
      domEls += this.renderAverage()

      this.el.innerHTML = domEls
    }
  }

  return Basic
}
