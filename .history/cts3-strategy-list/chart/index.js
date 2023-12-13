import { defaultData, handleData } from '../getParser'
import { titleIcon } from '../imgs/title-icon'
import { titleBg } from '../imgs/title-bg'
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

    renderTitle(type, title) {
      const titleIconEl = `<img src="${titleIcon}" />`
      const titleTypeEl = `<span style="margin:0 5px;min-width:30px">${type}</span>`
      const titleTextEl = `<span>${title}</span>`

      const titleContainer = `<div class="title-container" style="background-image: url(${titleBg})">
        ${titleIconEl}
        ${titleTypeEl}
        ${titleTextEl}
      </div>`

      return titleContainer
    }

    renderList() {
      let listEls = ''

      this.parserData.itemData.forEach((itemData, index) => {
        const titleEls = this.renderTitle(
          this.parserData.policyName[index],
          this.parserData.policyTitle[index]
        )

        let listItemEl = titleEls

        itemData.forEach((item) => {
          let contentEl = `<div class="list-icon"></div><span class="list-item__label">${item.itemName}</span>`
          contentEl += `<span>${item.itemCount ?? 0}</span>`
          listItemEl += `<div class="list-li__container">${contentEl}</div>`
        })

        listEls += `<li class="list-item">${listItemEl}</li>`
      })

      return `<ul class="list-ul">${listEls}</ul>`
    }

    render() {
      this.el.innerHTML = ''
      let domEls = ''
      domEls += this.renderList()
      this.el.innerHTML = `<div style="width: 100%;height: 100%;">
        <div class="cts3-strategy__wrapper_two">${domEls}</div>
      </div>`
    }

    resize({ width, height }) {
      // width:400 height:360
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    setSeriesStyle(config) {}

    setOption() {}

    destroy() {}
  }

  return Basic
}
