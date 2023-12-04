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

    render() {
      const { title, count, time } = this.parserData

      this.el.innerHTML = ''

      const titleEl = ` <span  style="padding-left:14px;">${title}，数量</span>`
      const countEl = `<span style="color:#FEA100">${count}</span>`
      const newEl = `<span class="new-tip">new</span>`
      const moreBtnEl = `<span class="more-btn">更多>></span>`

      const isNew = Date.now() - new Date(time).getTime() <= 1000 * 60 * 60 * 3

      let domEls = titleEl + countEl
      if (isNew) domEls += newEl
      domEls += moreBtnEl

      this.el.innerHTML = `<div class="custom-cpn__wrapper warning_bg">
        <div class="warning-wrapper">
          ${domEls}
        </div>
      </div>`
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
