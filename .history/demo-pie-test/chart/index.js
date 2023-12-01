import echarts from 'echarts'
import setLegendStyle from './setLegendStyle'
import setSeriesData from './setSeriesData'
import deepCopy from 'lodash/cloneDeep'
import './global.css'

export const Chart = function (Base) {
  class PIE extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.id = props.widgetId
      this.theme = theme
      this.chart = echarts.init(el)
      if (option) {
        this.chart.setOption(option)
      }
    }

    // render() {
    //   let html = `<div class="qwe-asd">11111</div>
    //     <div id="zxc-vbn" style="width: 40px;height: 80px;overflow:auto;">
    //       <div class="zxc-vbn-ul" style="width: 40px;height: 20px;">12</div>
    //       <div class="zxc-vbn-ul" style="width: 40px;height: 20px;">23</div>
    //       <div class="zxc-vbn-ul" style="width: 40px;height: 20px;">34</div>
    //       <div class="zxc-vbn-ul" style="width: 40px;height: 20px;">45</div>
    //       <div class="zxc-vbn-ul" style="width: 40px;height: 20px;">56</div>
    //       <div class="zxc-vbn-ul" style="width: 40px;height: 20px;">67</div>
    //     </div>`
    //   this.el.innerHTML = html
    // }

    setOption(option) {
      this.chart.setOption(option)
    }

    setSeriesStyle(__seriesStyle) {
      const { label: { normal: labelStyle = {} } = {}, labelLine: { normal: labelLineStyle = {} } = {}, ...rest } = deepCopy(__seriesStyle)
      const seriesStyle = { label: labelStyle, labelLine: labelLineStyle, ...rest }
      if (seriesStyle.radius) {
        seriesStyle.radius = [seriesStyle.radius[0] + '%', seriesStyle.radius[1] + '%']
      }
      if (seriesStyle.center) {
        seriesStyle.center = [seriesStyle.center[0] + '%', seriesStyle.center[1] + '%']
      }
      if (this.option.series && this.option.series.length) {
        this.option.series = this.option.series.map((item, i) => {
          return Object.assign({}, item, seriesStyle)
        })
      }
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    destroy() {
    }
  }

  PIE.prototype.setLegendStyle = setLegendStyle
  PIE.prototype.setSeriesData = setSeriesData

  return PIE
}
