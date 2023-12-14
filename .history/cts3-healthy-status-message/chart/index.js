import { defaultData, handleData } from '../getParser'
import { randomString } from '../utils'
import { href } from '../themes/basic/config'

import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.parserData = handleData(defaultData)

      this.moreBtnId = randomString()
      this.moreHref = href
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

      const moreBtnEl = `<div id=${this.moreBtnId}  target="blank" class="more-btn">更多>></div>`

      const isNew = Date.now() - new Date(time).getTime() <= 1000 * 60 * 60 * 3

      let domEls = titleEl + countEl
      if (isNew) domEls += newEl

      this.el.innerHTML = `<div style="box-sizing: border-box;width: 100%;height: 100%; ">
      <div class="cts3-systemStatusMessage__wrapper_two">
        <div class="warning-wrapper">
          <div style="flex:1;">${domEls}</div>
          ${moreBtnEl}
        </div>
      </div>
      </div>`

      // 添加事件
      const timer = setInterval(() => {
        const el = document.getElementById(this.moreBtnId)
        if (el) {
          clearInterval(timer)
          el.onclick = () => {
            window.open(this.moreHref, '_blank')
          }
        }
      })
    }

    resize({ width, height }) {
      // width:385 height:110
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    setSeriesStyle(config) {
      this.moreHref = config.href
    }

    setOption() {}

    destroy() {}
  }

  return Basic
}
