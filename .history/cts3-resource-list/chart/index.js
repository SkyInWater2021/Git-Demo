import './global.css'
import { handleData } from '../getParser'
import { titleIcon, resourceBg } from '../imgs/title-icon'
import { cyan, yellow, green, purple } from '../imgs/icons'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.parserData = handleData()

      this.demoData = [
        'N15-babj-cts-01',
        'N15-babj-cts-02',
        'N15-babj-cts-03',
        'N15-babj-cts-04',
        'N15-babj-cts-05',
        'N15-babj-cts-06',
        'N15-babj-cts-07',
        'N15-babj-cts-08',
        'N15-babj-cts-09',
        'N15-babj-cts-10',
        'N15-babj-cts-11',
        'N15-babj-cts-12',
        'N15-babj-cts-13',
        'N15-babj-cts-14',
        'N15-babj-cts-15'
      ]
      this.currentContent = []
      this.columns = 2
      this.pageSize = 6
      this.currentPage = 1
      this.totalPage = 1

      this.id = this.randomString(10) + 'resourceIndicator'
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

    // 标题
    renderTitle(title) {
      const iconEl = `<img src="${titleIcon}"></img>`
      const titleText = `<span class="title-text">${title}</span>`
      return `<div class="resource-list__title">
        ${iconEl}
        ${titleText}
      </div>`
    }

    // 内容
    renderContent() {
      const icons = [cyan, green, yellow, purple]
      const labels = ['接入', '收集', '处理', '分发']
      const values = [10, 100, 200, 52]

      let contentItemEls = ''

      icons.forEach((icon, index) => {
        contentItemEls += `<div class="content-item">
          <img src="${icon}"/>
          <span>${labels[index]}：${values[index]}</span>
        </div>`
      })

      return `<div class="content-wrapper">${contentItemEls}</div>`
    }

    // 列表
    renderList() {
      let listEls = ''

      this.currentContent = this.demoData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )

      this.currentContent.forEach((title) => {
        const titleEl = this.renderTitle(title)
        const contentEl = this.renderContent()
        listEls += `<div class="list-item" style="background: url(${resourceBg}) no-repeat,
         linear-gradient(transparent 42%, #defaf866 45% 88%, transparent 90%) no-repeat;
         background-size: 100% 100%, 1px 100%;
         background-position: 0 0, 48% 50%;">
        ${titleEl}
        ${contentEl}
       </div>`
      })

      const lastLength = this.currentContent.length % this.columns
      const extra = lastLength === 0 ? 0 : this.columns - lastLength

      if (extra > 0) {
        for (let i = 0; i < extra; i++) {
          listEls += `<div class="list-item" style="height:0;"></div>`
        }
      }
      return listEls
    }

    renderIndicator() {
      let indicatorEls = ''

      for (let i = 1; i <= this.totalPage; i++) {
        indicatorEls += `<div class="indicator-item ${
          i === this.currentPage ? 'indicator-item__active' : ''
        }" data-page-index=${i}></div>`
      }

      const changePage = (event) => {
        const { pageIndex } = event?.target?.dataset ?? {}
        if (this.currentPage === Number(pageIndex)) return

        this.currentPage = Number(pageIndex)
        this.render()
      }

      // 添加事件
      const timer = setInterval(() => {
        const el = document.getElementById(this.id)
        if (el) {
          clearInterval(timer)
          el.onclick = (event) => changePage(event)
        }
      })

      return `<div id="${this.id}" class="indicator-wrapper">${indicatorEls}</div>`
    }

    render() {
      this.el.innerHTML = ''

      let domEls = ''
      domEls += this.renderList()
      domEls += this.renderIndicator()
      this.el.innerHTML = `<div class="common-cpn__wrapper ">
      <div class="resource-list__container">${domEls}</div>
      </div>`
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    setSeriesStyle(config) {
      this.columns = config.columns ?? 2
      this.pageSize = config.pageSize ?? 6
      this.currentPage = 1
      this.totalPage = Math.ceil(this.demoData.length / this.pageSize)
    }
  }

  return Basic
}
