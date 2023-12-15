import { defaultData, handleData } from '../getParser'
import { randomString } from '../utils'
import { href, background } from '../themes/basic/config'

import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.parserData = handleData(defaultData)

      this.anchorElId = randomString()
      this.href = href
      this.background = background
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    render() {
      this.el.innerHTML = ''

      const domEls = ''

      this.el.innerHTML = `<div style="box-sizing: border-box;width: 100%;height: 100%; ">
      <div id="${this.anchorElId}" style="background:${this.background}" class="cts3-anchorLink__wrapper_two">
        ${domEls}
      </div>
      </div>`

      // 添加事件
      const timer = setInterval(() => {
        const el = document.getElementById(this.anchorElId)
        if (el) {
          clearInterval(timer)
          el.onclick = () => {
            window.open(this.href, '_blank')
          }
        }
      })
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    setSeriesStyle(config) {
      this.href = config.href
      this.background = config.background
    }

    setOption() {}

    destroy() {}
  }

  return Basic
}
