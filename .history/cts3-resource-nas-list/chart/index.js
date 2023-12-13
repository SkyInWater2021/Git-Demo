import { defaultData, handleData } from '../getParser'
import { nasIcon } from '../imgs/nas-icon'
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

    renderItemTitle() {
      const titleIcon = `<img src="${nasIcon}"/>`
      const titleText = `<span>NAS</span>`
      return `<div class="nas-title__container">${titleIcon + titleText}</div>`
    }

    renderListItem(labels, values) {
      let listItemEls = ''

      labels.forEach((label, index) => {
        listItemEls += `<div class="content-stage">
        <span style="color:#35EAFF;">${label}</span>
        <span style="color:white;">(${values[index]})</span>
        </div>`
      })

      return `<div class="nas-content__container">
        ${this.renderItemTitle()}
        ${listItemEls}
        </div>`
    }

    renderList() {
      const labels = ['工作目录', 'NAS空间', '用途', 'Max iops']

      let els = ''
      this.parserData['id'].data.forEach((_, index) => {
        const { workDir, workMax, workNote, workSpace } = this.parserData
        const values = [
          workDir.data[index],
          workSpace.data[index],
          workNote.data[index],
          workMax.data[index]
        ]

        els += this.renderListItem(labels, values)
      })

      return `<div class="list-container">${els}</div>`
    }

    render() {
      this.el.innerHTML = ''
      let domEls = ''
      domEls += this.renderList()
      this.el.innerHTML = `<div style="width: 100%;height: 100%;">
        <div class="cts3-nas__wrapper_two">${domEls}</div>
      </div>`
    }

    resize({ width, height }) {
      // width:400 height:165
      this.el.style.cssText += `;width:${400}px;height:${165}px;`
    }

    setSeriesStyle(config) {}

    setOption() {}

    destroy() {}
  }

  return Basic
}
