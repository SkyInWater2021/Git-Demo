import echarts from 'echarts'

export const Chart = function (Base) {
  class Graph extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.id = props.widgetId
      this.theme = theme
      this.chart = echarts.init(el)

      if (option) {
        this.chart.setOption(option)
      }
    }
  }

  return Graph
}
