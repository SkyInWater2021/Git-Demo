import { defaultData, handleData } from '../getParser'
import { nasIcon } from '../imgs/nas-icon'
import { randomString } from '../utils'
import { href } from '../themes/basic/config'
import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.parserData = handleData(defaultData)

      this.rootId = randomString()
      this.href = href
    }

    setData(data) {
      this.parserData = data
      this.render()
    }

    renderItemTitle(title) {
      const titleIcon = `<img style="cursor:pointer" src="${nasIcon}" data-title="${title}" />`
      const titleText = `<span style="cursor:pointer" data-title="${title}">${title}</span>`
      return `<div class="nas-title__container">${titleIcon + titleText}</div>`
    }

    renderListItem(labels, values, title) {
      let listItemEls = ''

      labels.forEach((label, index) => {
        listItemEls += `<div class="content-stage">
        <span style="color:#35EAFF;">${label}</span>
        <span style="color:white;">(${values[index]})</span>
        </div>`
      })

      return `<div class="nas-content__container">
        ${this.renderItemTitle(title)}
        ${listItemEls}
        </div>`
    }

    renderList() {
      const labels = ['工作目录', 'NAS空间', '用途', 'Max iops']

      let els = ''
      this.parserData['id'].data.forEach((_, index) => {
        const { workDir, workMax, workNote, workSpace, workName } =
          this.parserData
        const values = [
          workDir.data[index],
          workSpace.data[index],
          workNote.data[index],
          workMax.data[index]
        ]

        const title = workName.data[index]
        els += this.renderListItem(labels, values, title)
      })

      return `<div class="list-container">${els}</div>`
    }

    render() {
      this.el.innerHTML = ''
      let domEls = ''
      domEls += this.renderList()
      this.el.innerHTML = `<div style="width: 100%;height: 100%;">
        <div id="${this.rootId}" class="cts3-nas__wrapper_two">${domEls}</div>
      </div>`

      const timer = setInterval(() => {
        const el = document.getElementById(this.rootId)
        if (el) {
          clearInterval(timer)
          el.onclick = (e) => {
            const { title } = e.target.dataset
            if (!title) return
            const hrefKey = 'workName'
            const href = `${this.href}?${hrefKey}=${title}`
            window.open(href, '_blank')
          }
        }
      })
    }

    resize({ width, height }) {
      // width:400 height:165
      this.el.style.cssText += `;width:${400}px;height:${165}px;`
    }

    setSeriesStyle(config) {
      this.href = config.href
    }

    setOption() {}

    destroy() {}
  }

  return Basic
}
