import './global.css'
import { handleData } from '../getParser'
import { nasIcon } from '../imgs/nas-icon'

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

    renderTitle() {
      const titleIcon = `<img src="${nasIcon}"/>`
      const titleText = `<span>NAS</span>`

      return `<div class="nas-title__container">${titleIcon + titleText}</div>`
    }

    renderContent() {
      const labels = ['工作目录', 'NAS空间', '用途', 'Max iops']
      const values = ['work12', '100t', '省级', '写10万/s、读5万/s']

      let listItemEls = ''
      labels.forEach((label, index) => {
        listItemEls += `<div class="content-stage">
        <span style="color:#35EAFF;">${label}</span>
        <span style="color:white;">(${values[index]})</span>
        </div>`
      })

      return `<div class="nas-content__container">${listItemEls}</div>`
    }

    render() {
      this.el.innerHTML = ''

      let domEls = ''
      domEls += this.renderTitle()
      domEls += this.renderContent()

      this.el.innerHTML = `<div class="common-cpn__wrapper cts3-nas__wrapper">${domEls}</div>`
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
