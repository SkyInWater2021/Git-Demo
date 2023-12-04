import './global.css'
import { handleData } from '../getParser'
import { titleIcon } from '../imgs/title-icon'
import { titleBg } from '../imgs/title-bg'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el
      this.chartInstance = null

      this.parserData = handleData()

      this.listLabel = []
      this.listValue1 = []
      this.listValue2 = []
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
      const titleIconEl = `<img src="${titleIcon}" />`
      const titleTypeEl = `<span style="margin:0 5px;min-width:30px">${this.parserData.titleType}</span>`
      const titleTextEl = `<span>${this.parserData.titleText}</span>`

      const titleContainer = `<div class="title-container" style="background-image: url(${titleBg})">
        ${titleIconEl}
        ${titleTypeEl}
        ${titleTextEl}
      </div>`

      return titleContainer
    }

    renderList() {
      let listItemEls = ''

      this.listLabel.forEach((label, index) => {
        let contentEl = `<div class="list-icon"></div><span class="list-item__label">${label}</span>`
        contentEl += `<span>${this.listValue1[index] ?? 0}</span>`

        if (this.listValue2[index]) {
          contentEl += `<span>/${this.listValue2[index]}</span>`
        }

        listItemEls += `<li class="list-li__container">${contentEl}</li>`
      })

      return `<ul class="list-ul">${listItemEls}</ul>`
    }

    render() {
      this.el.innerHTML = ''

      let domEls = ''
      domEls += this.renderTitle()
      domEls += this.renderList()

      this.el.innerHTML = `<div class="common-cpn__wrapper strategy-list__wrapper">${domEls}</div>`
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    }

    setOption() {}

    setSeriesStyle(config) {
      console.log(config)
      this.parserData.titleText = config.text
      this.parserData.titleType = config.type

      try {
        if (config.listLabel) {
          this.listLabel = JSON.parse(config.listLabel.replace(/'/g, '"'))
        }
        if (config.listValue1) {
          this.listValue1 = JSON.parse(config.listValue1.replace(/'/g, '"'))
        }
        if (config.listValue2) {
          this.listValue2 = JSON.parse(config.listValue2.replace(/'/g, '"'))
        }
      } catch (error) {
        console.error(error)
      }
    }

    destroy() {}
  }

  return Basic
}
