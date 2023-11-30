import deepCopy from 'lodash/cloneDeep'
import { bac } from './config'
import jsonData from './1.json'
import './global.css'

let overflowText = `text-overflow: ellipsis;overflow: hidden;white-space: nowrap;`

export const Chart = function (Base) {
  class Table extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el
      // this.el.style.background = '#00356d'
      this.timerCenter = null

      this.showSTDBLog = true
      this.showHADBLog = true
      this.showRADBLog = true
      this.showPGDBLog = true
      this.showNASLog = true
      this.showOSSLog = true

      let temp = jsonData.series[0].data
      this.allData = {
        'mainDataList': JSON.parse(temp[0].value[0]),
        'STDB': JSON.parse(temp[1].value[0]),
        'HADB': JSON.parse(temp[2].value[0]),
        'NAS': JSON.parse(temp[3].value[0]),
        'OSS': JSON.parse(temp[4].value[0]),
        'RADB': JSON.parse(temp[5].value[0]),
        'PGDB': JSON.parse(temp[6].value[0]),
      }

      this.matchArr = []
      this.colorArr = ['#e0b406', '#3cc851', '#d792a2', '#89dde1']

      this.mainDataList = []
      this.STDB = {}
      this.HADB = {}
      this.NAS = []
      this.OSS = []
      this.RADB = {}
      this.PGDB = []

      // 随机类名
      this.tableClass1 = 'c-storge-1-' + this.randomString(10)
      this.tableClass2 = 'c-storge-2-' + this.randomString(10)
      this.tableClass3 = 'c-storge-3-' + this.randomString(10)
      this.tableClass4 = 'c-storge-4-' + this.randomString(10)
      this.tableClass5 = 'c-storge-5-' + this.randomString(10)
      this.tableClass6 = 'c-storge-6-' + this.randomString(10)
      this.tableClassCenter = 'c-storge-center-' + this.randomString(10)
      this.mainDataListDom = null

      this.STDBHeader = []
      this.HADBHeader = []

      this.STDBDataLen = 0
      this.HADBDataLen = 0
      this.NASDataLen = 0
      this.OSSDataLen = 0
      this.RADBDataLen = 0
      this.PGDBDataLen = 0

      this.RADBFourData = []
      this.PGDBFourData = []

      this.STDBDataAllLen = 0
      this.HADBDataAllLen = 0
      this.NASDataAllLen = 0
      this.OSSDataAllLen = 0
      this.RADBataAllLen = 0
      this.PGDBataAllLen = 0

      this.firstLoad = true
      this.magrginLog = true
      this.secTLog = false

      this.centerLen = 20
      this.windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      this.windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    
      this.verticalDomTemp1 = null
      this.verticalDomTemp2 = null
      this.verticalDomTempColor1 = null
      this.verticalDomTempColor2 = null

      this.lineDomTemp1 = null
      this.lineDomTemp2 = null
      this.lineDomTemp3 = null

      this.co = 0
    }
    
    // 设置颜色
    setColor(val) {
      let t = this.matchArr.find( i => i.D_DATA_ID === val)
      let c = t ? t.color : '#fff'
      return c
    }

    isJSON(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }

    // 随机数
    randomString (len) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
      const maxPos = chars.length
      let str = ''
      for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return str
    }
  
    // 渲染中间 框
    setCenterData(val) {
      let t = []
      if(val instanceof Array){
        t = val
      }else{
        t = [val]
      }
      // let child = `<div class="child" style="width: 100%;height: 350px;overflow: hidden;"></div>`
      let h = `<div class="content" style="height: 780px;overflow: hidden;position: relative;">`
      if(t && t.length){
        h += this.renderCentetBox(t)
        h += this.renderCentetBox(t, 1)
      } else {
        h += `<p style="color: #fff;text-align: center;">暂无数据</p>`
      }
      h += `</div>`
      return h
    }


    // 渲染 中间部分
    renderCentetBox(t, log){
      let tableHtml = `<div class="child" style="${ !log ? 'margin-top: 400px;' : '' };position: relative;">`
      t.map((x, i) => {
        let { name, files } = x
        let tem = this.matchArr[i].color
        tableHtml += `<div class="sub-child" style="text-align: center;position: relative;">`
        tableHtml += this.renderCenterTitle(name, tem)
        if(files.length){
          tableHtml += this.setCenterDom(files, tem)
        }
        tableHtml += `</div>`
      })
      tableHtml += `</div>`
      return tableHtml
    }

    // 中间部分 标题
    renderCenterTitle(name, tem) {
      this.centerLen += 1
      let t = `<p class="sub-name single-line"
        style="font-size: 14px;text-align: center;color: #fff;padding: 4px 20px 4px 20px;
        border: 1px solid ${tem};will-change: transform;
        border-radius: 15px;box-shadow: inset 1px 1px 4px ${tem}, inset -1px -1px 4px ${tem};">
        ${name}
      </p>`
      return t
    }

    // 中间部分 每条数据更新
    setCenterDom(val, tem) {
      let t = `<ul>`
      val.map((k) => {
        this.centerLen += 1
        t += `<li style="
          ${overflowText};font-size: 12px;will-change: transform;
          width: 260px;color: ${tem};padding: 2px 0;" title="${k}" class="single-line">${k}</li>`
      })
      t += `</ul>`
      return t
    }

    // 渲染 垂直部分 表格
    setVerticalTable(val, log){
      let headerE = []
      let headerC = []
      let nameArr = []
      let color = '#fff'
      if(val){
        headerE = val.field.split(',')
        headerC = val.fieldName.split(',')
        nameArr = !log ? headerE : headerC
        color = this.setColor(val.D_DATA_ID)
      }
      this.HADBHeader = headerE
      let tableHtml = `<div style="position: relative;display: flex;color:${color};">`
      if(val.DS.length) {
        // 表头
        tableHtml += this.setVerticalHeader(nameArr, color)
        // 内容
        tableHtml += `
        <div class="content" style="width: 240px;display: flex;">
          <div class="child">暂无数据</div>
          <div class="child"></div>
          <div class="child"></div>
        </div>`
      }else{
        tableHtml += `<div style="color: #fff;text-align: center;width: 100%;">暂无数据</div>`
      }
      tableHtml += `</div>`
      return tableHtml
    }

    // 渲染 垂直部分 表头
    setVerticalHeader(arr, color) {
      let t = `<div style="display: flex;width: 25%;flex-direction: column;align-items: center;margin-right: 4px;">`
      arr.map((i) => {
        t+= `<p style="${overflowText};width: 100%;text-align: center;color: ${color}" title="${i}">${i}</p>`
      })
      t += `</div>`
      return t
    }

    // 渲染 垂直部分 单条数据
    setVerticalDom(tableData, color, log) {
      let t = ``
      tableData.map((k) => {
        t += `<div style="display: flex;width: 76px;flex-direction: column;align-items: center;margin:0 2px;">`
        this.HADBHeader.map((l) => {
          t += `<p class="${ !log ? 'typingX' : ''}" style="${overflowText};width: 76px;text-align: center;color: ${color}" title="${k[l]}" >${k[l]}</p>`
        })
        t += `</div>`
      })
      return t
    }

    // 渲染 横向表格
    setRransverseTable(val, log) {
      let headerE = []
      let headerC = []
      let nameArr = []
      let color = "#fff"
      if(val){
        headerE = val.field.split(',')
        headerC = val.fieldName.split(',')
        nameArr = !log ? headerE : headerC
        color = this.setColor(val.D_DATA_ID)
      }
      this.STDBHeader = headerE
      let tableHtml = `<div style="position: relative;">`
      if(val.DS.length) {
        // 表头
        tableHtml += this.setRransverseHeader(nameArr, color)
        //内容
        tableHtml += `
        <div class="content" style="position:absolute;top: 20px;left: 0;width: 100%;height: 64px;overflow: hidden;color: ${color};text-align: center;">
          <div class="child">暂无数据</div>
          <div class="child"></div>
          <div class="child"></div>
        </div>`
      }else {
        tableHtml +=`<div style="color: #fff;text-align: center;">暂无数据</div>`
      }
      tableHtml +=`</div>`
      return tableHtml
    }

    // 渲染 横向 表头
    setRransverseHeader(arr, color){
      let t = `<div style="height:20px;width: 100%;display: flex;align-items: center;position:absolute;top: 0;left: 0;">`
      arr.map((i) => {
        t+= `<p style="${overflowText};flex: 1;text-align: center;color: ${color}" title="${i}">${i}</p>`
      })
      t += `</div>`
      return t
    }

    // 渲染 横向 单条数据
    setRransverseDom(tableData, color) {
      let t = ``
      tableData.map((j) => {
        t += `<div style="align-items: center;height:20px;margin: 1px 0;">`
        let d = ``
        this.STDBHeader.map((l) => {
          d += j[l].toString().slice(0, 9) + ' '
        })
        t += `<p title="${d}" class="typingX"
            style="${overflowText};margin: 1px 0;text-align: center;color: ${color};">${d}</p>`
        t += `</div>`
      })
      return t
    }

    setLineDom(val, log){
      let t = ``
      val.map((i) => {
        t += `<p class="${ !log ? 'typingL' : ''}" style="width: 100%;height: 20px;line-height: 20px;margin: 1px 0;${overflowText};" title="${i}">${i}</p>`
      })
      return t
    }

    setMoreLine(val){
      let color = this.setColor(val.D_DATA_ID)
      let t = `<div class="content" style="width: 100%;height: 88px;overflow: hidden;text-align: center;color: ${color}">`
      if(val && val.DS.length){
        t += `<div class="child">暂无数据</div><div class="child"></div><div class="child"></div><div class="child"></div>`
      }else {
        t += `<div>暂无数据</div>`
      }
      t += `</div>`
      return t
    }

    render() {
      let tempData = this.allData
      this.matchArr = tempData.mainDataList.map((x,i) => {
        let { D_DATA_ID, name } = x
        return {
          D_DATA_ID,
          name,
          color: this.colorArr[i]
        }
      })
      this.mainDataList = tempData.mainDataList
      this.STDB = tempData.STDB
      this.HADB = tempData.HADB
      this.NAS = tempData.NAS
      this.OSS = tempData.OSS
      this.RADB = tempData.RADB
      this.PGDB = tempData.PGDB

      this.STDBDataAllLen = this.STDB.DS.length
      this.HADBDataAllLen = this.HADB.DS.length
      this.NASDataAllLen = this.NAS.DS.length
      this.OSSDataAllLen = this.OSS.DS.length
      this.RADBDataAllLen = this.RADB.DS.length
      this.PGDBDataAllLen = this.PGDB.DS.length
      
      if(this.firstLoad){
        clearInterval(this.timerCenter)

        // 6个表格
        let html = `<div class="c-dataStorageOne" style="position: relative;" >
          <div class="${this.tableClass1}" style="position: absolute;width: 314px;height: 169px;
            top: 117px;left: 16px;padding-top: 53px;background: url('${bac}');"></div>
          <div class="${this.tableClass2}" style="position: absolute;width: 314px;height: 169px;
            top: 117px;right: 15px;padding-top: 38px;background: url('${bac}');"></div>
          <div class="${this.tableClass3}" style="position: absolute;width: 314px;height: 169px;
            top: 411px;left: 16px;padding-top: 53px;background: url('${bac}');"></div>
          <div class="${this.tableClass4}" style="position: absolute;width: 314px;height: 169px;
            top: 411px;right: 15px;padding-top: 53px;background: url('${bac}');"></div>
          <div class="${this.tableClass5}" style="position: absolute;width: 314px;height: 169px;
            top: 702px;left: 16px;padding-top: 53px;background: url('${bac}');"></div>
          <div class="${this.tableClass6}" style="position: absolute;width: 314px;height: 169px;
            top: 702px;right: 15px;padding-top: 53px;background: url('${bac}');"></div>
          <div class="${this.tableClassCenter}" style="position: absolute;height: 780px;width: 260px;
            top: 100px;left: 50%;transform: translateX(-50%);overflow: hidden;"></div>
        </div>`
        this.el.innerHTML = html

        let domAll = document.getElementsByClassName('c-dataStorageOne')[0]
        this.mainDataListDom = domAll.getElementsByClassName(this.tableClassCenter)[0]
        let STDB = domAll.getElementsByClassName(this.tableClass1)[0]
        let HADB = domAll.getElementsByClassName(this.tableClass2)[0]
        let NAS = domAll.getElementsByClassName(this.tableClass3)[0]
        let RADB = domAll.getElementsByClassName(this.tableClass4)[0]
        let OSS = domAll.getElementsByClassName(this.tableClass5)[0]
        let PGDB = domAll.getElementsByClassName(this.tableClass6)[0]
        
        STDB.innerHTML = this.setRransverseTable(this.STDB, 0) // 要素数据库
        HADB.innerHTML = this.setVerticalTable(this.HADB, 0) //历史
        RADB.innerHTML = this.setMoreLine(this.RADB) //实时应用
        NAS.innerHTML = this.setMoreLine(this.NAS)
        OSS.innerHTML = this.setMoreLine(this.OSS)
        PGDB.innerHTML = this.setMoreLine(this.PGDB)
      }

      this.mainDataListDom.innerHTML = this.setCenterData(this.mainDataList)
    
      this.startFollowCenter()
      
    }

    // 设置打字机效果
    setSTDBData(val) {
      let domAll = document.getElementsByClassName('c-dataStorageOne')[0]
      let STDB = domAll.getElementsByClassName(this.tableClass1)[0]
      let STDBContent = STDB.getElementsByClassName('content')[0]
      let line1 = STDBContent.getElementsByClassName('child')[0]
      let line2 = STDBContent.getElementsByClassName('child')[1]
      let line3 = STDBContent.getElementsByClassName('child')[2]
      let newData = this.setRransverseDom([this.STDB.DS[val - 1]], this.setColor(this.STDB.DS[val - 1].D_DATA_ID))
      if(!this.secTLog){
        if(val === 1){
          line1.innerHTML = newData
        } else if(val === 2){
          line2.innerHTML = newData
        } else if(val === 3){
          line3.innerHTML = newData
        } else {
          line1.style.animation = 'fadeOut .5s'
          line1.innerHTML = ``
          let temp2 = line2.innerText
          let temp3 = line3.innerText
          setTimeout(() => {
            line1.innerHTML = `<div style="align-items: center;height:20px;margin: 1px 0;">${temp2}</div>`
            line2.innerHTML = `<div style="align-items: center;height:20px;margin: 1px 0;">${temp3}</div>`
            line3.innerHTML = newData
          }, 500)
        }
      } else {
        line1.style.animation = 'fadeOut .5s'
        let temp2 = line2.innerText
        let temp3 = line3.innerText
        setTimeout(() => {
          line1.innerHTML = `<div style="align-items: center;height:20px;margin: 1px 0;">${temp2}</div>`
          line2.innerHTML = `<div style="align-items: center;height:20px;margin: 1px 0;">${temp3}</div>`
          line3.innerHTML = newData
        }, 500)
      }
    }

    // 设置打字机效果
    setHADBData(val) {
      let domAll = document.getElementsByClassName('c-dataStorageOne')[0]
      let HADB = domAll.getElementsByClassName(this.tableClass2)[0]
      let HADBContent = HADB.getElementsByClassName('content')[0]
      let line1 = HADBContent.getElementsByClassName('child')[0]
      let line2 = HADBContent.getElementsByClassName('child')[1]
      let line3 = HADBContent.getElementsByClassName('child')[2]
      let newData = this.setVerticalDom([this.HADB.DS[val - 1]], this.setColor(this.HADB.DS[val - 1].D_DATA_ID))
      if(!this.secTLog){
        if(val === 1){
          line1.innerHTML = newData
        } else if(val === 2){
          line2.innerHTML = newData
        } else if(val === 3){
          line3.innerHTML = newData
        } else {
          line1.style.animation = 'fadeOut .5s'
          setTimeout(() => {
            this.verticalDomTemp1 = [this.HADB.DS[val - 3]]
            this.verticalDomTemp2 = [this.HADB.DS[val - 2]]
            this.verticalDomTempColor1 = this.HADB.DS[val - 3].D_DATA_ID
            this.verticalDomTempColor2 = this.HADB.DS[val - 2].D_DATA_ID
            line1.innerHTML = this.setVerticalDom(this.verticalDomTemp1, this.setColor(this.verticalDomTempColor1), 1)
            line2.innerHTML = this.setVerticalDom(this.verticalDomTemp2, this.setColor(this.verticalDomTempColor2), 1)
            line3.innerHTML = newData
          }, 500)
        }
      } else {
        line1.style.animation = 'fadeOut .5s'
        setTimeout(() => {
          line1.innerHTML = this.setVerticalDom(this.verticalDomTemp1, this.setColor(this.verticalDomTempColor1), 1)
          line2.innerHTML = this.setVerticalDom(this.verticalDomTemp2, this.setColor(this.verticalDomTempColor2), 1)
          line3.innerHTML = newData
          let temp = this.verticalDomTemp2
          this.verticalDomTemp1 = temp
          this.verticalDomTemp2 = this.HADB.DS[val - 1]
        }, 500)
      }
    }

    // 单条
    setLineData(val, count, className){
      let domAll = document.getElementsByClassName('c-dataStorageOne')[0]
      let Name = domAll.getElementsByClassName(className)[0]
      let Content = Name.getElementsByClassName('content')[0]
      let line1 = Content.getElementsByClassName('child')[0]
      let line2 = Content.getElementsByClassName('child')[1]
      let line3 = Content.getElementsByClassName('child')[2]
      let line4 = Content.getElementsByClassName('child')[3]
      let newData = this.setLineDom([val[count - 1]])
      if(!this.secTLog){
        if(count === 1){
          line1.innerHTML = newData
        } else if(count === 2){
          line2.innerHTML = newData
        } else if(count === 3){
          line3.innerHTML = newData
        } else if(count === 4){
          line4.innerHTML = newData
        } else {
          line1.style.animation = 'fadeOut .5s'
          setTimeout(() => {
            this.lineDomTemp1 = [val[count - 4]]
            this.lineDomTemp2 = [val[count - 3]]
            this.lineDomTemp3 = [val[count - 2]]
            line1.innerHTML = this.setLineDom(this.lineDomTemp1, 1)
            line2.innerHTML = this.setLineDom(this.lineDomTemp2, 1)
            line3.innerHTML = this.setLineDom(this.lineDomTemp3, 1)
            line4.innerHTML = newData
            line1.style.animation = 'none'
          }, 500)
        }
      } else {
        line1.style.animation = 'fadeOut .5s'
        setTimeout(() => {
          line1.innerHTML = this.setLineDom(this.lineDomTemp1, 1)
          line2.innerHTML = this.setLineDom(this.lineDomTemp2, 1)
          line3.innerHTML = this.setLineDom(this.lineDomTemp3, 1)
          line4.innerHTML = newData
          line1.style.animation = 'none'
          let temp1 = this.lineDomTemp2
          let temp2 = this.lineDomTemp3
          this.lineDomTemp1 = temp1
          this.lineDomTemp2 = temp2
          this.lineDomTemp3 = val[count - 1]
        }, 500)
      } 
    }

    // 四条
    setLineFourData(className, arr){
      let domAll = document.getElementsByClassName('c-dataStorageOne')[0]
      let Name = domAll.getElementsByClassName(className)[0]
      let Content = Name.getElementsByClassName('content')[0]
      let line1 = Content.getElementsByClassName('child')[0]
      let line2 = Content.getElementsByClassName('child')[1]
      let line3 = Content.getElementsByClassName('child')[2]
      let line4 = Content.getElementsByClassName('child')[3]
      line1.innerHTML = ``
      setTimeout(() => {
        line1.classList.add('typingL')
        if(arr[0]){
          line1.innerHTML = this.setLineDom([arr[0]])
        }
      }, 300)
      line2.innerHTML = ``
      setTimeout(() => {
        line2.classList.add('typingL')
        if(arr[1]){
          line2.innerHTML = this.setLineDom([arr[1]])
        }
      }, 300)
      line3.innerHTML = ``
      setTimeout(() => {
        line3.classList.add('typingL')
        if(arr[2]){
          line3.innerHTML = this.setLineDom([arr[2]])
        }
      }, 300)
      line4.innerHTML = ``
      setTimeout(() => {
        line4.classList.add('typingL')
        if(arr[3]){
          line4.innerHTML = this.setLineDom([arr[3]])
        }
      }, 300)
    }

    setData(data) {
      let temp = data.series[0].data
      this.allData = {
        'mainDataList': JSON.parse(temp[0].value[0]),
        'STDB': JSON.parse(temp[1].value[0]),
        'HADB': JSON.parse(temp[2].value[0]),
        'NAS': JSON.parse(temp[3].value[0]),
        'OSS': JSON.parse(temp[4].value[0]),
        'RADB': JSON.parse(temp[5].value[0]),
        'PGDB': JSON.parse(temp[6].value[0]),
      }
      this.firstLoad = false
      this.secTLog = false
      this.render()
    }

    setSeriesStyle(__seriesStyle) {
      const defaultStyle = deepCopy(__seriesStyle) // 默认
    }

    destroy() {
      clearInterval(this.timerCenter)
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width: 934px;height: 975px;`
      // this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }

    startFollowCenter() {
      let allDom = document.getElementsByClassName(this.tableClassCenter)[0]
      let parent = allDom.getElementsByClassName('content')[0]
      if(parent) {
        let child = parent.getElementsByClassName('child')[0]// 滚动元素
        let child2 = parent.getElementsByClassName('child')[1]// 滚动元素

        let aStart = 220 + 30
        let aEnd = aStart + this.STDBDataAllLen * 22

        let bStart = aEnd + 30
        let bEnd = bStart + this.RADBDataAllLen * 22

        let cStart = bEnd + 30
        let cEnd = cStart + this.NASDataAllLen * 22

        let dStart = cEnd + 30
        let dEnd = dStart + this.OSSDataAllLen * 22

        let that = this

        let aStart2 = 0
        let aEnd2 = 10

        let bStart2 = aEnd2 + 30
        let bEnd2 = bStart2 + this.RADBDataAllLen * 22

        if(this.STDBDataAllLen >= 9) {
          bStart2 = 0
          bEnd2 = 10
        } else {
          bStart2 = aEnd2 + 30
          bEnd2 = bStart2 + this.RADBDataAllLen * 22
        }

        let cStart2 = bEnd2 + 30
        let cEnd2 = cStart2 + this.NASDataAllLen * 22

        let dStart2 = cEnd2 + 30
        let dEnd2 = dStart2 + this.OSSDataAllLen * 22
        
        if(child){
          let logTrue = true
          let scrollTop = 0
          let q = document.getElementsByClassName('single-line')
          let qq = q[0].getBoundingClientRect().top
          let aa = (780 / 552 * qq).toFixed(0)
          let bb = (345 / 552 * qq).toFixed(0)
          console.log('qq', qq)
          console.log('aa', aa)
          console.log('bb', bb)
          console.log('111', child.scrollHeight)
          this.timerCenter = setInterval(() => {
            setTimeout(()=>{
              // [780, 345]

              scrollTop += 1
              child.style.transform = `translateY(-${scrollTop}px)`;
              child2.style.transform = `translateY(-${scrollTop}px)`;
              if(scrollTop > child.scrollHeight - 400){
                console.log('11111')
              }
              // if(logTrue){
              //   if(scrollTop >= child.scrollHeight + 400) {
              //     scrollTop = 0
              //     child.style.marginTop = 0
              //     logTrue = false
              //     that.secTLog = false
              //     this.tpPushData(scrollTop, aStart2, aEnd2, bStart2, bEnd2, cStart2, cEnd2, dStart2, dEnd2)
              //   } else {
              //     scrollTop += 1
              //     child.style.transform = `translateY(-${scrollTop}px)`;
              //     child2.style.transform = `translateY(-${scrollTop}px)`;
              //     this.tpPushData(scrollTop, aStart, aEnd, bStart, bEnd, cStart, cEnd, dStart, dEnd)
              //   }
              // } else {
              //   if(scrollTop >= child.scrollHeight) {
              //     scrollTop = 0
              //     child.style.marginTop = 0
              //     that.secTLog = false
              //   } else {
              //     scrollTop += 1
              //     child.style.transform = `translateY(-${scrollTop}px)`;
              //     child2.style.transform = `translateY(-${scrollTop}px)`;
              //     this.tpPushData(scrollTop, aStart2, aEnd2, bStart2, bEnd2, cStart2, cEnd2, dStart2, dEnd2)
              //   }
              // }

              for(let i = 0;i < q.length; i++){
                let temHeight = q[i].getBoundingClientRect().top
                if(temHeight < aa && temHeight > bb) {
                  q[i].style.opacity = 0.2
                  q[i].classList.remove('hiddenView')
                  q[i].classList.add('showView')
                }else {
                  q[i].classList.remove('showView')
                  q[i].classList.add('hiddenView')
                }
              }

            }, 0)
          },55);
        }
      }
    }

    tpPushData(scrollTop, aStart, aEnd, bStart, bEnd, cStart, cEnd, dStart, dEnd) {
      let that = this
      if(scrollTop > aStart && scrollTop < aEnd && that.showSTDBLog && that.showHADBLog){
        that.showSTDBData()
        that.showHADBData()
        that.showSTDBLog = false
        that.showHADBLog = false
      }
      if(scrollTop > aEnd && !that.showSTDBLog && !that.showHADBLog){
        that.showSTDBLog = true
        that.showHADBLog = true
      }

      if(scrollTop > bStart && scrollTop < bEnd && that.showRADBLog && that.showPGDBLog){
        that.showRADBData()
        that.showPGDBData()
        that.showRADBLog = false
        that.showPGDBLog = false
      }
      if(scrollTop > bEnd && !that.showRADBLog && !that.showPGDBLog ){
        that.showRADBLog = true
        that.showPGDBLog = true
      }

      if(scrollTop > cStart && scrollTop < cEnd && that.showNASLog){
        that.showNASData()
        that.showNASLog = false
      }
      if(scrollTop > cEnd && !that.showNASLog){
        that.showNASLog = true
      }

      if(scrollTop > dStart && scrollTop < dEnd && that.showOSSLog){
        that.showOSSData()
        that.showOSSLog = false
      }
      if(scrollTop > dEnd && !that.showOSSLog){
        that.showOSSLog = true
      }

      if(scrollTop > aStart && scrollTop < aEnd && that.showSTDBLog && that.showHADBLog){
        that.showSTDBData()
        that.showHADBData()
        that.showSTDBLog = false
        that.showHADBLog = false
      }
      if(scrollTop > aEnd && !that.showSTDBLog && !that.showHADBLog){
        that.showSTDBLog = true
        that.showHADBLog = true
        that.showSTDBData()
        that.showHADBData()
      }
    }


    showSTDBData() {
      let that = this
      for(let i = 0; i < this.STDBDataAllLen; i++){
        setTimeout(() => {
          that.setSTDBData(i + 1)
        }, 2200 * i)
      }
    }

    showHADBData() {
      let that = this
      for(let i = 0; i < this.HADBDataAllLen; i++){
        setTimeout(() => {
          that.setHADBData(i + 1)
        }, 2200 * i)
      }
    }

    showRADBData() {
      let that = this
      for(let i = 0; i < this.RADBDataAllLen; i = i + 4){
        setTimeout(() => {
          if(i + 4 < that.RADBDataAllLen){
            that.setLineFourData(that.tableClass4, [
              this.RADB.DS[i],
              this.RADB.DS[i + 1],
              this.RADB.DS[i + 2],
              this.RADB.DS[i + 3]
            ])
          }
        }, 2000 * i)
      }
    }

    showPGDBData() {
      let that = this
      for(let i = 0; i < this.PGDBDataAllLen; i = i + 4){
        setTimeout(() => {
          if(i + 4 < that.PGDBDataAllLen){
            that.setLineFourData(that.tableClass6, [
              this.PGDB.DS[i],
              this.PGDB.DS[i + 1],
              this.PGDB.DS[i + 2],
              this.PGDB.DS[i + 3]
            ])
          }
        }, 2000 * i)
      }
    }

    showNASData() {
      let that = this
      for(let i = 0; i < this.NASDataAllLen; i++){
        setTimeout(() => {
          that.setLineData(that.NAS.DS, i + 1, that.tableClass3)
        }, 2000 * i)
      }
    }

    showOSSData(){
      let that = this
      for(let i = 0; i < this.OSSDataAllLen; i++){
        setTimeout(() => {
          that.setLineData(that.OSS.DS, i + 1, that.tableClass5)
        }, 2000 * i)
      }
    }

  }

  return Table
}
