import { defaultData, handleData } from '../getParser'
import { titleIcon, resourceBg } from '../imgs/title-icon'
import { cyan, yellow, green, purple } from '../imgs/icons'
import { randomString } from '../utils'
import { href } from '../themes/basic/config'
import './global.css'

export const Chart = function (Base) {
  class Basic extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el

      this.parserData = handleData(defaultData)

      this.indicatorId = randomString()
      this.rootId = randomString()

      this.currentContent = {}
      this.columns = 2
      this.pageSize = 6
      this.currentPage = 1
      this.totalPage = 1

      this.autoPlayTimer = null

      this.href = href
    }

    setData(data) {
      this.parserData = data
      this.totalPage = Math.ceil(
        this.parserData.hostName.data.length / this.pageSize
      )
      this.currentPage = 1
      this.render()
    }

    // 标题
    renderTitle(title) {
      const iconEl = `<img src="${titleIcon}" data-title="${title}"></img>`
      const titleText = `<span class="title-text" data-title="${title}">${title}</span>`
      return `<div class="resource-list__title">
              ${iconEl} ${titleText}
          </div>`
    }

    // 内容
    renderContent(labels, values) {
      const icons = [cyan, green, yellow, purple]

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

      Object.keys(this.parserData).forEach((key) => {
        this.currentContent[key] = this.parserData[key].data.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )
      })

      this.currentContent.hostName.forEach((title, index) => {
        const titleEl = this.renderTitle(title)

        const {
          linkName,
          linkCount,
          colName,
          colCount,
          dealName,
          dealCount,
          distName,
          distCount
        } = this.currentContent
        const labels = [
          linkName[index],
          colName[index],
          dealName[index],
          distName[index]
        ]
        const values = [
          linkCount[index],
          colCount[index],
          dealCount[index],
          distCount[index]
        ]

        const contentEl = this.renderContent(labels, values)
        listEls += `<div class="list-item" style="background: url(${resourceBg}) no-repeat,
             linear-gradient(transparent 42%, #defaf866 45% 88%, transparent 90%) no-repeat;
             background-size: 100% 100%, 1px 100%;
             background-position: 0 0, 48% 50%;">
            ${titleEl}
            ${contentEl}
           </div>`
      })

      const lastLength = this.currentContent.hostName.length % this.columns
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

        if (this.currentPage === Number(pageIndex) || !pageIndex) return

        this.currentPage = Number(pageIndex)
        this.render()
      }

      // 添加事件
      const timer = setInterval(() => {
        const el = document.getElementById(this.indicatorId)
        if (el) {
          clearInterval(timer)
          el.onclick = (event) => changePage(event)
        }
      })

      return `<div id="${this.indicatorId}" class="indicator-wrapper">${indicatorEls}</div>`
    }

    autoPlay() {
      clearInterval(this.autoPlayTimer)

      this.autoPlayTimer = setInterval(() => {
        this.currentPage += 1
        if (this.currentPage > this.totalPage) this.currentPage = 1
        this.render()
      }, 5000)
    }

    render() {
      this.el.innerHTML = ''

      let domEls = ''
      domEls += this.renderList()
      domEls += this.renderIndicator()
      this.el.innerHTML = `<div style="width: 100%;height: 100%;">
        <div id="${this.rootId}" class="cts3-resource__wrapper_two">${domEls}</div>
      </div>`

      // 添加自动轮播
      this.autoPlay()

      // 鼠标移入时停止轮播
      const timer = setInterval(() => {
        const el = document.getElementById(this.rootId)
        if (el) {
          clearInterval(timer)
          el.onmouseover = (e) => {
            clearInterval(this.autoPlayTimer)
          }
          el.onmouseleave = (e) => {
            this.autoPlay()
          }
          el.onclick = (e) => {
            const { title } = e.target.dataset
            if (!title) return
            const hrefKey = 'hostName'
            const href = `${this.href}?${hrefKey}=${title}`
            window.open(href, '_blank')
          }
        }
      })
    }

    resize({ width, height }) {
      // width:405 height:250
      this.el.style.cssText += `;width:${460}px;height:${280}px;`
    }

    setSeriesStyle(config) {
      this.href = config.href

      this.totalPage = Math.ceil(
        this.parserData.hostName.data.length / this.pageSize
      )
      this.currentPage = 1
    }

    setOption() {}

    destroy() {
      clearInterval(this.autoPlayTimer)
    }
  }

  return Basic
}
