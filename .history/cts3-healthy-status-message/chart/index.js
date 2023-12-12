import { defaultData, handleData } from '../getParser'
import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.parserData = handleData(defaultData)
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

      this.el.innerHTML = `<div style="box-sizing: border-box;width: 100%;height: 100%; ">
      <div class="cts3-systemStatusMessage__wrapper_two">
        <div class="warning-wrapper">
          ${domEls}
        </div>
      </div>
      </div>`
    }

    resize({ width, height }) {
      // width:385 height:110
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    setSeriesStyle(config) {}

    setOption() {}

    destroy() {}
  }

  return Basic
}
