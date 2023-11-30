import deepCopy from 'lodash/cloneDeep'
import axios from 'axios'
import echarts from 'echarts'
import {
  toplefticon,
  toprighticon,
  topmunbac,
  topceterbac,
  cpuImg,
  memImg,
  iconImgBac,
  leftArrowIcon,
  rightArrowIcon
} from './config'
import './global.css'

export const Chart = function (Base) {
  class PIE extends Base {
    constructor(option, el, theme, props) {
      super(...arguments)
      this.el = el
      // this.el.style.background = '#000e1a'

      this.selectOption = {
        className: 'sel-' + this.randomString(10),
        // leftVaule: '国家气象中心',
        // rightVaule: '国家气象中心气象服务信息系统',
        leftVaule: '',
        rightVaule: '',
        allData: [
          // { SYSTEM: '1', COMPANY: '1',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '12',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '13',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '14',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '15',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '16',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '17',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '18',USERID: '1' },
          // { SYSTEM: '1', COMPANY: '19',USERID: '1' },
        ]
      }
      this.topClassName = 'top-' + this.randomString(10)
      this.tableOption = {
        bacColor: ['#123c62', '#021422'],
        tableClass1: this.randomString(10),
        tableClass2: this.randomString(10),
        contentClass1: this.randomString(10),
        contentClass2: this.randomString(10),
        table1Data: [],
        table2Data: []
      }
      this.tabOpton = {
        class1: 'tab-' + this.randomString(10),
        class2: 'tab-' + this.randomString(10)
      }
      this.pieOption = {
        className: 'pidbox-' + this.randomString(10),
        id1: 'pid-' + this.randomString(10),
        id2: 'pid-' + this.randomString(10),
        chart1: null,
        chart2: null
      }
      this.timer = null
      this.timer2 = null
      this.userId = ''
      this.topData = {
        top: [
          { name: 'CPU', count: '0', unit: '核' },
          { name: '内存', count: '0', unit: 'GB' }
        ],
        numArr: [
          { name: '分配的存储资源', count: '0', unit: 'TB' },
          { name: '融入的算法数', count: '0', unit: '个' },
          { name: '融入的产品数', count: '0', unit: '个' }
        ]
      }
      this.bottomData = [
        { name: '产品数量', count: '0' },
        { name: '产品总调用次数', count: '0' }, // invokedTotalSize 次
        { name: '被调用的产品量', count: '0' }, // invokedProductSize 个
        { name: '产品被本系统调用次数', count: '0' }, // sysInvokedSize 次
        { name: '被外系统调用的产品数', count: '0' }, // outerInvokedPrductSize 个
        { name: '产品被外系统调用次数', count: '0' } // outerInvokedSize 次
      ]
      this.bottomClassName = 'bottom-' + this.randomString(10)
      // this.selectOption.allData = unitSys.data
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

    // 获取系统名称
    getSys() {
      const selectBoxDom = document.getElementsByClassName(
        this.selectOption.className
      )[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataStorage/getCompanyAndSystem'
        )
        .then((res) => {
          // console.log('获取系统名称', res)
          if (res.data && res.data.data.length) {
            this.selectOption.allData = res.data.data
            if (res.data.data.length) {
              // this.selectOption.leftVaule = res.data.data[0].COMPANY
              // this.selectOption.rightVaule = res.data.data[0].SYSTEM
              // this.userId = res.data.data[0].USERID
              this.selectOption.leftVaule = '气象中心'
              this.selectOption.rightVaule = '生态气象预报评估'
              this.userId = 'NMC_SH2022_SAND'
            }
            selectBoxDom.innerHTML = this.setSelectDom()
            this.selectAct()
            this.refresh()
          }
        })
        .catch(() => {
          this.selectOption.allData = []
          selectBoxDom.innerHTML = this.setSelectDom()
          this.selectAct()
        })
    }

    // 融入算法数
    intoMethodsApi() {
      const topBoxDom = document.getElementsByClassName(this.topClassName)[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/mainDpl/getAlgorithmsIntegratedNumberBySystem',
          {
            params: {
              userId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('融入算法数', res)
          if (res.data && res.data.data) {
            this.topData.numArr[1].count = res.data.data.ALGO_COUNT
            topBoxDom.innerHTML = this.topDom()
          }
        })
        .catch(() => {
          this.topData.numArr[1].count = 0
          topBoxDom.innerHTML = this.topDom()
        })
    }

    // 融入产品数
    intoProductApi() {
      const topBoxDom = document.getElementsByClassName(this.topClassName)[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataStorage/getSystemNumberOfProductsIncorporated'
        )
        .then((res) => {
          // console.log('融入产品数', res)
          if (res.data && res.data.data.length) {
            const temp = res.data.data.find((i) => i.USERID === this.userId)
            if (temp) {
              this.topData.numArr[2].count = temp.COUNT
              this.bottomData[0].count = temp.COUNT // 产品数量
            }
            topBoxDom.innerHTML = this.topDom()
          }
        })
        .catch(() => {
          this.topData.numArr[2].count = 0
          this.bottomData[0].count = 0
          topBoxDom.innerHTML = this.topDom()
        })
    }

    // 分配的存储资源
    handleResourceApi() {
      const topBoxDom = document.getElementsByClassName(this.topClassName)[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataStorage/getSystemAllocatedStorageResources'
        )
        .then((res) => {
          // console.log('分配的存储资源', res)
          if (res.data && res.data.data.length) {
            const temp = res.data.data.find((i) => i.USERID === this.userId)
            if (temp) {
              this.topData.numArr[0].count = temp.DATABASE
            }
            topBoxDom.innerHTML = this.topDom()
          }
        })
        .catch(() => {
          this.topData.numArr[0].count = 0
          topBoxDom.innerHTML = this.topDom()
        })
    }

    // CPU和内存
    cpuAndMemApi() {
      const topBoxDom = document.getElementsByClassName(this.topClassName)[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/mainDpl/getAllocatedComputingResourcesBySystem',
          {
            params: {
              userId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('CPU和内存', res)
          if (res.data && res.data.data) {
            this.topData.top[0].count = res.data.data.CPU
            this.topData.top[1].count = res.data.data.MEMORY
            topBoxDom.innerHTML = this.topDom()
          }
        })
        .catch(() => {
          this.topData.top[0].count = 0
          this.topData.top[1].count = 0
          topBoxDom.innerHTML = this.topDom()
        })
    }

    // 融入算法清单表格
    intoMethodsTableApi() {
      const leftTableBoxDom = document.getElementsByClassName(
        this.tableOption.contentClass1
      )[0]
      const header = ['算法名称', '调度策略', '日运行次数']
      const headerEnglish = ['ALGO_NAME', 'TRIGGER_TYPES', 'TRIGGER_COUNT']
      const colsWidth = [60, 20, 20]
      leftTableBoxDom.innerHTML = this.tableDom(
        [],
        header,
        headerEnglish,
        colsWidth,
        this.tableOption.tableClass1
      )
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/mainDpl/listIntegratedAlgorithmBySystem',
          {
            params: {
              userId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('融入算法清单表格', res)
          if (res.data && res.data.data.length) {
            const data = res.data.data
            this.table1Data = res.data.data
            leftTableBoxDom.innerHTML = this.tableDom(
              data,
              header,
              headerEnglish,
              colsWidth,
              this.tableOption.tableClass1
            )
            this.tableScroll()
            this.tableAction()
          }
        })
        .catch(() => {
          leftTableBoxDom.innerHTML = this.tableDom(
            [{ ALGO_NAME: '23', TRIGGER_TYPES: '423', TRIGGER_COUNT: '34343' }],
            header,
            headerEnglish,
            colsWidth,
            this.tableOption.tableClass1
          )
        })
    }

    // 融入产品清单表格 //DS -> data
    intoProductTableApi() {
      const rightTableBoxDom = document.getElementsByClassName(
        this.tableOption.contentClass2
      )[0]
      const header = ['数据名称', '当日访问次数(次)', '日访问量(GB)']
      const headerEnglish = ['dataName', 'queryTimes', 'dataSize']
      const colsWidth = [60, 20, 20]
      rightTableBoxDom.innerHTML = this.tableDom(
        [],
        header,
        headerEnglish,
        colsWidth,
        this.tableOption.tableClass2
      )
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataAccess/getDataQueryInfoUserCountByTimeRangeAndApiDataCodes',
          {
            params: {
              apiUserId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('融入产品清单表格', res)
          if (res.data && res.data.data.length) {
            const data = res.data.data
            this.table2Data = res.data.data
            rightTableBoxDom.innerHTML = this.tableDom(
              data,
              header,
              headerEnglish,
              colsWidth,
              this.tableOption.tableClass2
            )
            this.tableScroll2()
            this.tableAction()
          }
        })
        .catch(() => {
          rightTableBoxDom.innerHTML = this.tableDom(
            [],
            header,
            headerEnglish,
            colsWidth,
            this.tableOption.tableClass2
          )
        })
    }

    // 数据访问时效  //DS -> data
    dataVisitTimesApi() {
      this.setPieOption(1, [])
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataAccess/getServiceCostTimeProportion',
          {
            params: {
              apiUserId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('数据访问时效', res)
          if (res.data && res.data.data.length) {
            const data = [
              {
                name: '<1s',
                value: res.data.data[0].cost1
              },
              {
                name: '1-5s',
                value: res.data.data[0].cost15
              },
              {
                name: '>5s',
                value: res.data.data[0].cost5
              }
            ]
            this.setPieOption(1, data)
          }
        })
        .catch(() => {
          this.setPieOption(1, [])
        })
    }

    // 算法调度时效
    methodsGetTimesApi() {
      this.setPieOption(2, [])
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/mainDpl/getAlgorithmSchedulingTimeBySystem',
          {
            params: {
              userId: this.userId
            }
          }
        )
        .then((res) => {
          if (res.data && res.data.data) {
            const { THRESHOLDONE, THRESHOLDTWO, THRESHOLDTHREE } = res.data.data
            const sec = parseInt(THRESHOLDTWO) + parseInt(THRESHOLDTHREE || 0)
            const data = [
              {
                name: '<1s',
                value: THRESHOLDONE
              },
              {
                name: '>1s',
                value: sec
              }
            ]
            this.setPieOption(2, data)
          }
        })
        .catch(() => {
          this.setPieOption(2, [])
        })
    }

    // 被调用的产品数  产品总调用次数  //DS -> data
    bottom1Api() {
      const bottomBoxDom = document.getElementsByClassName(
        this.bottomClassName
      )[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataAccess/getServiceCountAndQueryTimesHor',
          {
            params: {
              apiUserId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('被调用的产品数  产品总调用次数', res)
          if (res.data && res.data.data.length) {
            this.bottomData[1].count = res.data.data[0].invokedTotalSize
            this.bottomData[2].count = res.data.data[0].invokedProductSize
            bottomBoxDom.innerHTML = this.bottomDom()
          }
        })
        .catch(() => {
          this.bottomData[1].count = 0
          this.bottomData[2].count = 0
          bottomBoxDom.innerHTML = this.bottomDom()
        })
    }

    // 产品被外系统调用次数  被外系统调用产品数  //DS -> data
    bottom2Api() {
      const bottomBoxDom = document.getElementsByClassName(
        this.bottomClassName
      )[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataAccess/getOuterServiceCountAndQueryTimesHor',
          {
            params: {
              apiUserId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('产品被外系统调用次数  被外系统调用产品数', res)
          if (res.data && res.data.data.length) {
            this.bottomData[5].count = res.data.data[0].outerInvokedSize
            this.bottomData[4].count = res.data.data[0].outerInvokedPrductSize
            bottomBoxDom.innerHTML = this.bottomDom()
          }
        })
        .catch(() => {
          this.bottomData[5].count = 0
          this.bottomData[4].count = 0
          bottomBoxDom.innerHTML = this.bottomDom()
        })
    }

    // 产品被本系统调用的次数 //DS -> data
    bottom3Api() {
      const bottomBoxDom = document.getElementsByClassName(
        this.bottomClassName
      )[0]
      axios
        .get(
          'http://10.20.96.202/tj-little-view-api/dataAccess/getServiceSysQueryTimesHor',
          {
            params: {
              apiUserId: this.userId
            }
          }
        )
        .then((res) => {
          // console.log('产品被本系统调用的次数', res)
          if (res.data.data && res.data.data.length) {
            this.bottomData[3].count = res.data.data[0].sysInvokedSize
            bottomBoxDom.innerHTML = this.bottomDom()
          }
        })
        .catch(() => {
          this.bottomData[3].count = 0
          bottomBoxDom.innerHTML = this.bottomDom()
        })
    }

    renderSelect() {
      let allHtml = `<div style="width: 100%;display: flex;align-items: center;justify-content: space-evenly;z-index: 2;
      position: relative;" class="${this.selectOption.className}">`
      const html = this.setSelectDom()
      allHtml += html + `</div>`
      return allHtml
    }

    // 选择框Dom
    setSelectDom() {
      const allData = this.selectOption.allData
      const nameAll = []
      const allOption = []
      let rightOption = []
      allData.map((i) => {
        const { SYSTEM, USERID, COMPANY } = i
        if (!nameAll.includes(COMPANY)) {
          nameAll.push(COMPANY)
          allOption.push({
            name: COMPANY,
            data: [{ USERID, SYSTEM }]
          })
        } else {
          allOption.map((j) => {
            if (j.name === COMPANY) {
              j.data.push({ USERID, SYSTEM })
            }
          })
        }
      })

      let leftOptionHtml = `<div style="width: 100%;text-align: left;display: none;height: 74px;overflow: auto;overflow-x:hidden;margin-top: 4px;
      background: rgba(1, 13, 23, 0.8);box-shadow: inset 2px 2px 2px #14528a, inset -2px -2px 2px #14528a;" class="components-options none" id="components-options-id">`
      nameAll.map((i) => {
        leftOptionHtml += `<p style="padding: 3px 0 3px 9px;cursor: pointer;color: #fff;" class="components-singleOption" onmouseover="this.style.color='#00F0FF';this.style.background='rgba(118, 161, 202, 0.8)'" onmouseout="this.style.color='#fff';this.style.background='transparent'">${i}</p>`
      })
      leftOptionHtml += `</div>`

      let rightOptionHtml = `<div style="width: 100%;text-align: left;display: none;height: 74px;overflow: auto;overflow-x:hidden;margin-top: 4px;
      background: rgba(1, 13, 23, 0.8);box-shadow: inset 2px 2px 2px #14528a, inset -2px -2px 2px #14528a;" class="components-options none" id="components-options-id2">`
      if (this.selectOption.leftVaule) {
        let tempOption = []
        allOption.map((v) => {
          if (v.name === this.selectOption.leftVaule) {
            tempOption = v.data.map((x) => {
              return x.SYSTEM
            })
          }
        })
        rightOption = tempOption
      }

      rightOption.map((i) => {
        rightOptionHtml += `<p style="padding: 3px 0 3px 9px;cursor: pointer;color: #fff;" onmouseover="this.style.color='#00F0FF'" onmouseout="this.style.color='#fff'" class="components-singleOption">${i}</p>`
      })
      rightOptionHtml += `</div>`

      let html = ``
      let leftHtml = `
      <div style="display: flex;align-items: center;width: 245px;justify-content: space-evenly;" id="components-select-1">
        <p style="font-size: 14px;margin-right: 4px;color: #fff;font-weight: bold;">单位: </p>
        <div style="width: 187px;height: 30px;font-size: 12px;position: relative;">
          <div class="components-input"
          style="cursor: pointer;width: 100%;height: 30px;line-height: 30px;text-align: left;
          font-size: 14px;padding: 0 9px;background: rgba(10, 56, 105, 0.2);color: #fff;
          border: 1px solid #298AE7;border-radius: 2px;overflow:hidden;box-shadow: inset 5px 5px 10px #14528a, inset -5px -5px 10px #14528a;"
          >${this.selectOption.leftVaule}</div>
          <img style="position: absolute;right: 4px;top: 50%;transform: translateY(-50%);"
            src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAMAAAAmGUT3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAk1BMVEUtMzsqMTkqMTgoLzYsMzs0O0ErMTguNTwrMjopMDcuNDtZX2VTWF8qMDkrMjpQVl1cY2lkaW9VWmEqMTgoLzdSWF5mbHIvNz1zeHxJT1UrMjlKUVZ3fIAvNz4zOkB9gYZnbXJ/goYwNj03PkQwNjw5QEdscHY+REqcoKOcn6KbnqGXm56WmZyHi4+6vL+LjpMAAACqDLmdAAAAKHRSTlMAAAAAAAAAAAAAALywHQ2uu823DA6x2R/vqAqX7S0w6cf8Q0NhU+BTsVNBrQAAAAFiS0dEMK7cLeQAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfnCBULLhJkyfpzAAAAQ0lEQVQI1wXBBQKAIBAEwOVEsbG7E/v/v3MGjuuBMV8GCFUUU5KqDHlxlFV9Ni20rr+Ge5w4SJ+f91sMAeLmuu2WLX6BxQShGjwfFgAAAABJRU5ErkJggg==">`
      leftHtml += leftOptionHtml
      leftHtml += `</div></div>`

      html += leftHtml

      let rightHtml = `
      <div style="display: flex;align-items: center;width: 245px;justify-content: space-evenly;" id="components-select-2">
        <p style="font-size: 14px;margin-right: 4px;color: #fff;font-weight: bold;">系统: </p>
        <div style="width: 187px;height: 30px;font-size: 12px;position: relative;">
          <div class="components-input"
          style="cursor: pointer;width: 100%;height: 30px;line-height: 30px;text-align: left;
          font-size: 14px;padding: 0 9px;background: rgba(10, 56, 105, 0.2);color: #fff;
          border: 1px solid #298AE7;border-radius: 2px;overflow:hidden;box-shadow: inset 5px 5px 10px #14528a, inset -5px -5px 10px #14528a;"
          >${this.selectOption.rightVaule}</span>
          </div>
          <img style="position: absolute;right: 4px;top: 50%;transform: translateY(-50%);"
            src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAMAAAAmGUT3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAk1BMVEUtMzsqMTkqMTgoLzYsMzs0O0ErMTguNTwrMjopMDcuNDtZX2VTWF8qMDkrMjpQVl1cY2lkaW9VWmEqMTgoLzdSWF5mbHIvNz1zeHxJT1UrMjlKUVZ3fIAvNz4zOkB9gYZnbXJ/goYwNj03PkQwNjw5QEdscHY+REqcoKOcn6KbnqGXm56WmZyHi4+6vL+LjpMAAACqDLmdAAAAKHRSTlMAAAAAAAAAAAAAALywHQ2uu823DA6x2R/vqAqX7S0w6cf8Q0NhU+BTsVNBrQAAAAFiS0dEMK7cLeQAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfnCBULLhJkyfpzAAAAQ0lEQVQI1wXBBQKAIBAEwOVEsbG7E/v/v3MGjuuBMV8GCFUUU5KqDHlxlFV9Ni20rr+Ge5w4SJ+f91sMAeLmuu2WLX6BxQShGjwfFgAAAABJRU5ErkJggg==">`
      rightHtml += rightOptionHtml
      rightHtml += `</div></div>`

      html += rightHtml
      return html
    }

    // 选择
    selectAct() {
      const selectBoxDom = document.getElementsByClassName(
        this.selectOption.className
      )[0]

      const inputDom = document.getElementById('components-select-1')
      const inputDom2 = document.getElementById('components-select-2')
      const tempOption =
        inputDom.getElementsByClassName('components-options')[0]
      const tempOption2 =
        inputDom2.getElementsByClassName('components-options')[0]

      inputDom.addEventListener('click', () => {
        if (tempOption.className.includes('none')) {
          tempOption.classList.remove('none')
          tempOption.style.display = 'block'
        } else {
          tempOption.classList.add('none')
          tempOption.style.display = 'none'
        }
      })
      tempOption.addEventListener('click', (el) => {
        this.selectOption.leftVaule = el.target.innerText
        const temp = this.selectOption.allData.find(
          (i) => i.COMPANY === el.target.innerText
        )
        if (temp) {
          this.selectOption.rightVaule = temp.SYSTEM
          this.userId = this.selectOption.allData.find(
            (i) => i.SYSTEM === temp.SYSTEM
          ).USERID
        }
        selectBoxDom.innerHTML = this.setSelectDom()
        this.selectAct()
        this.refresh()
      })

      inputDom2.addEventListener('click', () => {
        if (tempOption2.className.includes('none')) {
          tempOption2.classList.remove('none')
          tempOption2.style.display = 'block'
        } else {
          tempOption2.classList.add('none')
          tempOption2.style.display = 'none'
        }
      })
      tempOption2.addEventListener('click', (el) => {
        this.selectOption.rightVaule = el.target.innerText
        this.userId = this.selectOption.allData.find(
          (i) => i.SYSTEM === el.target.innerText
        ).USERID
        // console.log('this.userId', this.userId)

        selectBoxDom.innerHTML = this.setSelectDom()
        this.selectAct()
        this.refresh()
      })
    }

    refresh() {
      // 顶部
      this.intoMethodsApi()
      this.intoProductApi()
      this.handleResourceApi()
      this.cpuAndMemApi()

      // 表格
      this.intoMethodsTableApi()
      this.intoProductTableApi()

      // 饼图
      this.dataVisitTimesApi()
      this.methodsGetTimesApi()

      const bottomBoxDom = document.getElementsByClassName(
        this.bottomClassName
      )[0]
      for (let i = 1; i < 6; i++) {
        this.bottomData[i].count = 0
      }
      bottomBoxDom.innerHTML = this.bottomDom()
      // 底部
      this.bottom1Api()
      this.bottom2Api()
      this.bottom2Api()
    }

    // 渲染顶部
    renderTop() {
      let html = `<div style="width: 100%;height: 183px;position: relative;" class="${this.topClassName}">`
      html += this.topDom() + `</div>`
      return html
    }

    // 顶部DOM
    topDom() {
      const allData = this.topData
      let html = `<div style="width: 100%;position: relative;">
      <p style="color: #00F0FF;font-size: 14px;text-align: center;width: 100%;height: 16px;margin: 10px 0;position: relative;">
        <img src="${leftArrowIcon}" style="width: 40px; height: 16px; position: absolute; top: 3px; left: 150px;" />
        <img src="${rightArrowIcon}" style="width: 40px; height: 16px; position: absolute; top: 3px; right: 150px" />
        分配的计算资源
      </p>
      `
      html += `<div style="display: flex;justify-content: center;align-items: center;position: relative;padding: 10px 0;">`
      allData.top.map((i, index) => {
        html += `<div style="width: 50%;display:flex;justify-content: center;">
          <img style="width: 40px;height: 40px;" src="${
            !index ? cpuImg : memImg
          }" />
          <div style="padding: 0 12px;align-items: center;justify-content: space-between;
              display: flex;width: 188px;height: 40px;background: url(${iconImgBac}) no-repeat center/cover" >
            <p style="font-size: 15px;color: #fff;font-style: italic;font-weight: bold;">${
              i.name
            }</p>
            <p style="align-items: center;justify-content: space-between;display: flex;">
              <span style="font-style: italic;font-size: 24px;font-weight: bold;background: linear-gradient(0deg, #FF7B02 6%, #FFFF00 100%);
                -webkit-background-clip: text;-webkit-text-fill-color: transparent;">${
                  i.count
                }</span>
              <span style="font-size: 13px;color: #fff;padding: 3px 0 0 4px;">${
                i.unit
              }</span>
            </p>
          </div>
        </div>`
      })
      html += `</div>`
      html += `</div>
      <div style="width: 512px;height: 96px;display: flex;justify-content: space-around;
        align-items: center;">
      `
      allData.numArr.map((i) => {
        html += `
        <div style="display: flex;">
          <div style="background: url(${topmunbac}) no-repeat center/cover;width: 78px;height: 57px;text-align: center;">
            <p style="font-size: 28px;font-weight: bold;background: linear-gradient(0deg, #0084FF 0%, #FFFFFF 67.041015625%);
            -webkit-background-clip: text;-webkit-text-fill-color: transparent;">${i.count}<span style="font-size: 14px">${i.unit}</span>
            </p>
          </div>
          <div style="color: #fff;letter-spacing: 1px;font-size: 12px;width: 56px;text-align: center;display: flex;justify-content: center;align-items: center;">${i.name}</div>
        </div>
        `
      })
      html += `</div>`
      return html
    }

    setColor(val) {
      const tab1 = document.getElementsByClassName(this.tabOpton.class1)[0]
      const tab2 = document.getElementsByClassName(this.tabOpton.class2)[0]
      if (!val) {
        tab1.style.background =
          'linear-gradient(0deg, #0A3B64 0%, #009AE2 100%)'
        tab1.style.color = '#fff'
        tab2.style.background = '#083C60'
        tab2.style.color = '#7AAFDF'
      } else {
        tab1.style.background = '#083C60'
        tab1.style.color = '#7AAFDF'
        tab2.style.background =
          'linear-gradient(0deg, #0A3B64 0%, #009AE2 100%)'
        tab2.style.color = '#fff'
      }
    }

    setDisplay(log) {
      this.setColor(log)
      const dom1 = document.getElementsByClassName(
        this.tableOption.contentClass1
      )[0]
      const dom2 = document.getElementsByClassName(
        this.tableOption.contentClass2
      )[0]
      if (!log) {
        dom1.style.display = 'block'
        dom2.style.display = 'none'
        clearInterval(this.timer)
        clearInterval(this.timer2)
        this.tableScroll()
        this.tableAction()
      } else {
        dom2.style.display = 'block'
        dom1.style.display = 'none'
        clearInterval(this.timer)
        clearInterval(this.timer2)
        this.tableScroll2()
        this.tableAction()
      }
    }

    tabDom() {
      const html = `<div style="display: flex;height: 26px;cursor: pointer;">
        <p class="${this.tabOpton.class1}" style="flex: 1;text-align: center;font-size: 14px;line-height: 26px">融入算法清单</p>
        <p class="${this.tabOpton.class2}" style="flex: 1;text-align: center;font-size: 14px;line-height: 26px">融入产品清单</p>
        </div>`
      return html
    }

    tabAct() {
      const tab1 = document.getElementsByClassName(this.tabOpton.class1)[0]
      const tab2 = document.getElementsByClassName(this.tabOpton.class2)[0]
      this.setDisplay(0)

      tab1.addEventListener('click', () => {
        this.setDisplay(0)
      })
      tab2.addEventListener('click', () => {
        this.setDisplay(1)
      })
    }

    // 渲染表格
    renderTable(log, className, contentName) {
      const header = log
        ? ['数据名称', '当日访问次数(次)', '日访问量(GB)']
        : ['算法名称', '调度策略', '日运行次数']
      const headerEnglish = log
        ? ['dataName', 'queryTimes', 'dataSize']
        : ['ALGO_NAME', 'TRIGGER_TYPES', 'TRIGGER_COUNT']
      const colsWidth = log ? [60, 20, 20] : [60, 20, 20]
      const data = []

      let html = `<div style="position: relative;width:512px;height: 170px;" class="${contentName}">`
      html +=
        this.tableDom(data, header, headerEnglish, colsWidth, className) +
        `</div>`
      return html
    }

    tableDom(data, header, headerEnglish, colsWidth, className) {
      let tableHtml = ``
      tableHtml = `
        <div style="height: 32px;width: 100%;display: flex;align-items: center;
        position:absolute;top: 0;left: 0;color: #fff;flex-direction: column;
          background: url('data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAAAgCAMAAAA7ZrLvAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAflBMVEUFTYEFTIAFS34ESXwESXsESHoERXUEQnEEQW4DQG0ERncEQnADPmoDO2UDOWIDOGEDPWgCNVsCMlYCMVQCMlcCT34BTXsBTHkCL1EBKkkBJkMBJUEBLEwAIz8AIDoBSnUASHIAR3EAHzgBSnYASXUCUoMCUIACUH8A6v////8rvd4tAAAAKHRSTlN/fnx7enp3dnRzeXVyb25tcWppaGqFhINmZGJhZWBegX5+XoGAiIeGZw0FVwAAAAFiS0dEKcq3hSQAAAAHdElNRQfnBxwKBgrUYn7jAAABE0lEQVR42u3cSXKDQAxA0WYGM7QB22GyTeIh3P+EoSAsslHQ/r8zqPpvpDbTZIzjej4g8lzHmHlapskJwihOAFEchYGzPC+HNMsLC4iKPEsP8yNjgvRoy6oGRFVpj2kwPzBhZk/nywcgupxPNgsd40Z52bRdD4i6tinzyDVeXFRDd70Boms3VEXsGT+xdXsfPwHReG9rm/jrwPS3L0B06xkYKPwZGJKE/5AkqJAkqJAkqJAkqJAkqJAkqJAkqJAkqJAkqJAkqJAkqJAkqJAkqJAkqGwDs6xoPp4jIHo+1hVNlsCxy7YEvpyZNEMLiIZmPTNZDtle729A9H6th2ycymKX7VSWY3zssh3j890Hdvn97uMHrXh7RBkHu9QAAAAASUVORK5CYII=') no-repeat center/cover">
          <i style="width: 2px;height: 2px;background: #00eaff;position:absolute;top:0;left: 0"></i>
          <i style="width: 2px;height: 2px;background: #00eaff;position:absolute;top:0;right: 0"></i>
          <i style="width: 2px;height: 2px;background: #00eaff;position:absolute;bottom:0;left: 0"></i>
          <i style="width: 2px;height: 2px;background: #00eaff;position:absolute;bottom:0;right: 0"></i>
        `
      const headerDom = this.setHeaderDom(header, colsWidth)
      tableHtml += headerDom

      tableHtml += `</div><div style="position:absolute;top: 32px;left: 0;width: 100%;
        height: 138px;overflow: hidden;" class="${className}">`
      if (data.length) {
        const firDom = this.setDom(
          data,
          data.length,
          headerEnglish,
          0,
          colsWidth
        )
        tableHtml += firDom
        if (data.length > 5) {
          tableHtml += this.setDom(
            data,
            data.length,
            headerEnglish,
            1,
            colsWidth
          )
        }
      } else {
        tableHtml += `<div style="width: 100%; text-align: center;color: #fff;">暂无数据</div>`
      }
      tableHtml += `</div>`

      return tableHtml
    }

    setDom(data, len, header, log, colsWidth) {
      let firDom = `<div style="height: auto;" class="child">`
      for (let i = 0; i < len; i++) {
        const countLog = len % 2 === 0 // 双数
        const background = countLog
          ? i % 2 === 0
            ? this.tableOption.bacColor[0]
            : this.tableOption.bacColor[1]
          : i % 2 === 0
          ? !log
            ? this.tableOption.bacColor[0]
            : this.tableOption.bacColor[1]
          : !log
          ? this.tableOption.bacColor[1]
          : this.tableOption.bacColor[0]
        firDom += `
        <div style="color: #bfe4f4;display: flex;align-items: center;
          box-sizing:border-box;height: 28px;
          background: ${background}">`
        header.map((s, index) => {
          const width = colsWidth[index] + '%'
          firDom += `<span style="width: ${width};text-align: center; color: #bfe4f4;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;" title="${data[i][s]}">${data[i][s]}</span>`
        })
        firDom += `</div>`
      }
      firDom += `</div>`
      return firDom
    }

    setHeaderDom(header, colsWidth) {
      let headerDom = `<div style="display: flex;width: 100%;">`
      header.map((l, index) => {
        const width = colsWidth[index] + '%'
        headerDom += `<span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;
        height: 32px;word-break: break-all;line-height: 32px;width: ${width};
        text-align: center;" title="${l}">${l}</span>`
      })
      headerDom += `</div>`
      return headerDom
    }

    tableScroll() {
      clearInterval(this.timer)
      const parent = document.getElementsByClassName(
        this.tableOption.tableClass1
      )[0] // 滚动元素的父元素
      const child = parent.getElementsByClassName('child')[0] // 滚动元素
      if (child) {
        const tempTime = 50
        const tempTop = 0.01
        this.timer = setInterval(() => {
          setTimeout(() => {
            if (parent.scrollTop >= child.scrollHeight) {
              parent.scrollTop = 0
            } else {
              parent.scrollTop =
                parent.scrollTop +
                parseFloat((1 / window.devicePixelRatio).toFixed(2)) +
                tempTop
            }
          }, 0)
        }, tempTime)
      }
    }

    tableScroll2() {
      clearInterval(this.timer2)
      const parent = document.getElementsByClassName(
        this.tableOption.tableClass2
      )[0] // 滚动元素的父元素
      const child = parent.getElementsByClassName('child')[0] // 滚动元素
      if (child) {
        const tempTime = 50
        const tempTop = 0.01
        this.timer2 = setInterval(() => {
          setTimeout(() => {
            if (parent.scrollTop >= child.scrollHeight) {
              parent.scrollTop = 0
            } else {
              parent.scrollTop =
                parent.scrollTop +
                parseFloat((1 / window.devicePixelRatio).toFixed(2)) +
                tempTop
            }
          }, 0)
        }, tempTime)
      }
    }

    tableAction() {
      const boxTable = document.getElementsByClassName(
        this.tableOption.tableClass1
      )[0]
      if (boxTable) {
        boxTable.addEventListener('mouseenter', () => {
          clearInterval(this.timer)
        })
        boxTable.addEventListener('mouseleave', () => {
          if (this.table1Data && this.table1Data.length) {
            if (this.table1Data.length > 5) {
              this.tableScroll()
            }
          }
        })
      }

      const boxTable2 = document.getElementsByClassName(
        this.tableOption.tableClass2
      )[0]
      if (boxTable2) {
        boxTable2.addEventListener('mouseenter', () => {
          clearInterval(this.timer2)
        })
        boxTable2.addEventListener('mouseleave', () => {
          if (this.table2Data && this.table2Data.length) {
            if (this.table2Data.length > 5) {
              this.tableScroll2()
            }
          }
        })
      }
    }

    renderPie() {
      let html = `<div style="height: 134px;width: 512px;display: flex;position: relative;justify-content: center;" class="${this.pieOption.className}">`
      html += this.pieDom() + `</div>`
      return html
    }

    pieDom() {
      const temp = ['<1', '1-5s', '5s以上']
      const temp2 = ['<1', '1s以上']
      const html = `
        <div style="position: absolute;width: 100%;bottom: 0px;display: flex;justify-content: center;">
          <div style="width: 50%;display: flex;justify-content: center;margin-left: 30px;">
            <p style="display: flex;align-items: center;color: #fff;margin-right:20px;"><i style="background: #00ffc0;width: 5px;height: 5px;margin-right: 6px;border-radius: 50%;"></i><span>${temp[0]}</span></p>
            <p style="display: flex;align-items: center;color: #fff;margin-right:20px;"><i style="background: #00dcff;width: 5px;height: 5px;margin-right: 6px;border-radius: 50%;"></i><span>${temp[1]}</span></p>
            <p style="display: flex;align-items: center;color: #fff;"><i style="background: #d6aa39;width: 5px;height: 5px;margin-right: 6px;border-radius: 50%;"></i><span>${temp[2]}</span></p>
          </div>
          <div style="width: 50%;bottom: 0px;display: flex;justify-content: center;margin-left: 50px;">
            <p style="display: flex;align-items: center;color: #fff;margin-right:20px;"><i style="background: #00ffc0;width: 5px;height: 5px;margin-right: 6px;border-radius: 50%;"></i><span>${temp2[0]}</span></p>
            <p style="display: flex;align-items: center;color: #fff;"><i style="background: #fec942;width: 5px;height: 5px;margin-right: 6px;border-radius: 50%;"></i><span>${temp2[1]}</span></p>
          </div>
        </div>
        <div style="display: flex;width: 50%;justify-content: center;align-items: center;">
          <p style="color: #00FFD0;width: 24px;height:70px;padding: 5px 0 10px;border-top: 1px solid #fff;
            border-bottom: 1px solid #fff;">数据<br/>访问<br/>时效</p>
          <div id="${this.pieOption.id1}" style="width:210px;height: 134px;position: relative;"></div>
        </div>
        <div style="display: flex;width: 50%;justify-content: center;align-items: center;">
          <p style="color: #00FFD0;width: 24px;height:70px;padding: 5px 0 10px;border-top: 1px solid #fff;
          border-bottom: 1px solid #fff;">算法<br/>调度<br/>时效</p>
          <div id="${this.pieOption.id2}" style="width:210px;height: 134px;position: relative;"></div>
        </div>`
      return html
    }

    setPieOption(log, data) {
      const pie1 = document.getElementById(this.pieOption.id1)
      const pie2 = document.getElementById(this.pieOption.id2)
      const html = `<p style="width: 100%; text-align: center;color: #fff;position: absolute;
        top: 50%;transform: translateY(-50%);display: flex;flex-direction: column;">
          <span>${
            log === 1 ? '该系统生成的产品暂无接口访问' : '该系统暂无算法调度'
          }</span>
        </p>`
      const pieOption = {
        tooltip: {
          trigger: 'item'
        },
        // graphic: {
        //   elements: [{
        //     type: 'image',
        //     style: {
        //       image: 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB8lBMVEX//f/h5//l6//h6f/g6f/j6v/m6//q7//W4P/5+//3+f/j6v/e5//V3f/V3f/c5P/i6v/6/P/19//e5v/9/v/m7f+dtv9Ecv8vY/8eVf8kWf8qXv9IdP+Zsv/o7f/8/f/H1P/9/v/Q3P9We/8kV/8mYP9Vgv9NeP8nWf8pXf8nXv9Sfv/T3//8/f/3+f/d5f9Vf/8kW/8jXP9VgP/n7P/W4P8iW/9RfP/n7//u8v/l7P/3+f+Pqv9Vgv/z9v/n7P9Fcf8kXv+Bov/7/P/S3v/z9/9Bcv8oWP9Lef/u8v/l6/8oX//o7f/h6P/19//g6f8jWP89bf/n7v/j6/8qYf/b4//d5f/1+P/b4v8hWf9pjv/x9f/n7P/Bz//d5v/d5f8aWf9Zgv/k7P/+/v/K1v/H1v/j6/8kVf9njP/j6v/+/v/e5f8qXP/b5P/d5f/1+P/q7/9Ref8qVf+Jo//p7f/9/v/U3v8mWP9Qe//u8v/i6P/h6P+rwP8cVf/O2//////V3/9ah/+9zv/+/v/K1v/3+P/q7/9bgv9jjv+7zf9miP/L2P/g6P/g5/9tkv8zZv8AVf/+/v/v9P/L2f9ukP9Hcf/5+v/+/v/09//y9f/y9P/v8v/2+P/+/v/h6f/m7P/i6f/h6f/h6P/i6v/l7P8AAAB3k1h5AAAApXRSTlMABFmXe3uXWQeCpMGVeHmYxKuMAaTDSwMxKis2QGbHsAGrqA0BKDMDAQEBBa++e7sLAQEKlG8CBcmNA7A5DNqzAQIgtwtyAQEG06wBqI2NjAE2zaoBdattawE/3LJRjGoCCZXmZVaJAQ6T4iABe7dkwAYBJ5/nbQIFtqQCSQk5zJ4GEdcQebYtEjgeATiiKgUDmatKHgJnjbtZBwQsJwFGe2Fkhk3chldJAAAAAWJLR0SlLrlKLwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+cJDQo1Hm1GQTUAAAD6SURBVBjTY2AAAUYmZhZWNnYOBjjg5OLm4eXjFxAUggoIi4iKiUtISknLyMrJK4CFFJWUGVRU1dQ1NLW0dXRBInr6BoYMRsYmpkC2mbmFJQODlbUNSMLWzt4BSDk6ObswuIq6AZnuHp5eIBlvBh9fBj9/EDMgMCgYRIcwhIYxhEeAmJFR0TEQ+2PjGMLjgXRCYlJyCkQoNY5BKI0hPT0jMysbLJDDkJvHkF9QWFRcUloGUVNeUVnFUC1YU1tX39AI9UpTcwsDQ2tbe0dnF8y73T0gUqS3r38CAyqYOGnylKloYtOmz5g5i2H2nOlzEWLz5i9YuGjxEggHAKSSNtpyPu+HAAAAAElFTkSuQmCC',
        //       width: 18,
        //       height: 19
        //     },
        //     left: 'center',
        //     top: 'middle'
        //   }],
        //   zlevel: 6
        // },
        series: [
          // {
          //   name: '',
          //   type: 'pie',
          //   radius: ['0%', '26%'],
          //   avoidLabelOverlap: false,
          //   hoverAnimation: false,
          //   tooltip: {
          //     show: false
          //   },
          //   label: {
          //     show: false
          //   },
          //   labelLine: {
          //     show: false
          //   },
          //   data: [
          //     {
          //       value: 1,
          //       name: '',
          //       itemStyle: {
          //         normal: {
          //           color: 'rgba(19, 37, 79, 1)'
          //         }
          //       }
          //     },
          //     {
          //       value: 2,
          //       name: '',
          //       itemStyle: {
          //         normal: {
          //           color: new echarts.graphic.LinearGradient(
          //             1, 1, 1, 0,
          //             [
          //               { offset: 0, color: 'rgba(18, 38, 79, 0)' },
          //               { offset: 1, color: 'rgba(18, 38, 79, 1)' }
          //             ]
          //           )
          //         }
          //       }
          //     }
          //   ],
          //   zlevel: 1
          // },
          // {
          //   name: '',
          //   type: 'gauge',
          //   radius: '27%',
          //   startAngle: 200,
          //   endAngle: -25,
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     show: false
          //   },
          //   splitNumber: 60,
          //   axisLine: {
          //     show: false
          //   },
          //   splitLine: {
          //     length: 1,
          //     lineStyle: {
          //       width: 5,
          //       color: '#0768b2'
          //     }
          //   },
          //   detail: {
          //     show: false
          //   },
          //   zlevel: 2
          // },
          // {
          //   name: '',
          //   type: 'gauge',
          //   radius: '36%',
          //   startAngle: 0,
          //   endAngle: 360,
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     show: false
          //   },
          //   splitNumber: 30,
          //   axisLine: {
          //     show: false
          //   },
          //   splitLine: {
          //     length: 2,
          //     lineStyle: {
          //       width: 5,
          //       color: 'rgba(35, 101, 245, 0.5)'
          //     }
          //   },
          //   detail: {
          //     show: false
          //   },
          //   zlevel: 3
          // },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '61%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: '#040910',
                borderWidth: 0,
                color: function (color) {
                  // const colorList = ['#00c0fe', '#57d64f', '#fec235']
                  const colorList =
                    log === 1
                      ? [
                          {
                            start: '#3cd8ac',
                            end: '#57d64f'
                          },
                          {
                            start: '#00c0fe',
                            end: '#005dff'
                          },
                          {
                            start: '#fed75d',
                            end: '#fec235'
                          }
                        ]
                      : [
                          {
                            start: '#3cd8ac',
                            end: '#57d64f'
                          },
                          {
                            start: '#fed75d',
                            end: '#fec235'
                          }
                        ]
                  // return colorList[color.dataIndex]
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      // 左、下、右、上
                      offset: 0,
                      color: colorList[color.dataIndex]['start']
                    },
                    {
                      offset: 1,
                      color: colorList[color.dataIndex]['end']
                    }
                  ])
                }
              }
            },
            label: {
              show: true,
              normal: {
                // formatter: '{d}%',
                formatter: (row) => {
                  const { name, percent } = row
                  let html = ''
                  if (log === 1) {
                    if (name === '<1s') {
                      html = '{green|' + percent + '%}'
                    } else if (name === '1-5s') {
                      html = '{blue|' + percent + '%}'
                    } else {
                      html = '{yellow|' + percent + '%}'
                    }
                  } else {
                    if (name === '<1s') {
                      html = '{green|' + percent.toFixed(0) + '%}'
                    } else {
                      html = '{yellow|' + percent.toFixed(0) + '%}'
                    }
                  }
                  return html
                },
                fontSize: 11,
                fontFamily: 'Bahnschrift Condensed',
                padding: [-12, -30, 0, -30],
                rich: {
                  blue: {
                    color: '#00c0fe'
                  },
                  green: {
                    color: '#57d64f'
                  },
                  yellow: {
                    color: '#fec235'
                  }
                }
              }
            },
            labelLine: {
              show: true,
              length: 7,
              length2: 40
            },
            data,
            avoidLabelOverlap: true,
            zlevel: 5
          },
          {
            name: '',
            type: 'pie',
            radius: ['27%', '40%'],
            hoverAnimation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: function (color) {
                  const colorList = [
                    'rgba(0, 190, 251, 0.4)',
                    'rgba(87, 214, 79, 0.4)',
                    'rgba(251, 192, 52, 0.4)'
                  ]
                  return colorList[color.dataIndex]
                }
              }
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data,
            zlevel: 4
          }
        ]
      }
      this.pieOption.chart1 = null
      this.pieOption.chart2 = null
      pie1.removeAttribute('_echarts_instance_')
      pie2.removeAttribute('_echarts_instance_')

      if (data && data.length) {
        if (log === 1) {
          if (data && data.length) {
            if (
              data[0].value === 0 &&
              data[1].value === 0 &&
              data[2].value === 0
            ) {
              pie1.innerHTML = html
            } else {
              pie1.innerHTML = ''
              this.pieOption.chart1 = echarts.init(pie1)
              this.pieOption.chart1.resize()
              this.pieOption.chart1.setOption(pieOption)
            }
          }
        } else if (log === 2) {
          if (data && data.length) {
            if (data[0].value === 0 && data[1].value === 0) {
              pie2.innerHTML = html
            } else {
              pie2.innerHTML = ''
              this.pieOption.chart2 = echarts.init(pie2)
              this.pieOption.chart2.resize()
              this.pieOption.chart2.setOption(pieOption)
            }
          }
        }
      } else {
        if (log === 1) {
          pie1.innerHTML = html
        } else if (log === 2) {
          pie2.innerHTML = html
        }
      }
    }

    setProgress(val, x) {
      let html = `<span style="width: auto;height: 12px;display: flex;margin-right: 10px;position:relative">`
      const tempNum = (val / 5).toFixed(0)
      const unit = x % 2 === 0 ? '个' : '次'
      const leftCount = tempNum >= 20 ? 20 : tempNum
      const rightCount = tempNum >= 20 ? 0 : 20 - tempNum
      html += `<span style="width: ${
        5 * leftCount
      }px;height: 12px;background: linear-gradient(to right, #03fdff, #1ab3fa);"></span>`
      html += `<span style="width: ${
        5 * rightCount
      }px;height: 12px;background: #1a4263;"></span>`
      html += `</span><span style="color: #fff"><span style="font-weight: bold;">${val}</span>${unit}</span>`
      return html
    }

    renderBottom() {
      let html = `<div style="width: 500px;height: 110px;margin: 5px auto 0;" class="${this.bottomClassName}">`
      html += this.bottomDom() + `</div>`
      return html
    }

    bottomDom() {
      const allData = this.bottomData
      let html = `<div style="width: 500px;height: 110px;overflow: auto;overflow-x: hidden;border: 1px solid rgba(5, 44, 65, 1)">`
      allData.map((i, x) => {
        const temp =
          x % 2 === 0
            ? `border-bottom: 1px solid rgba(5, 44, 65, 1);border-right: 1px solid rgba(5, 44, 65, 1);`
            : `border-bottom: 1px solid rgba(5, 44, 65, 1);`
        html += `
          <div style="width: 50%;height: 36px;display: flex;align-items: center;float: left;${temp}">
            <div style="background: rgba(10, 71, 103, 0.4);width: 80px;color: #fff;height: 36px;overflow: hidden;
            text-align: center;display: flex;justify-content: center;align-items: center;" title="${
              i.name
            }">${i.name}</div>
            <div style="display: flex;align-items: center;margin: 0 0 0 16px;">${this.setProgress(
              i.count,
              x
            )}</div>
          </div>
          `
      })
      html += `</div>`
      return html
    }

    render() {
      clearInterval(this.timer)
      clearInterval(this.timer2)

      let allDom = `<div style="width: 100%;height: 100%;" id="components-id-zu">`

      const selectDom = this.renderSelect()
      const topDom = this.renderTop()
      const tabDom = this.tabDom()

      const tableDom = this.renderTable(
        0,
        this.tableOption.tableClass1,
        this.tableOption.contentClass1
      )
      const tableDom2 = this.renderTable(
        1,
        this.tableOption.tableClass2,
        this.tableOption.contentClass2
      )

      const pieDom = this.renderPie()
      const bottomDom = this.renderBottom()

      allDom += selectDom
      allDom += topDom
      allDom += tabDom
      allDom += tableDom
      allDom += tableDom2
      allDom += pieDom
      allDom += bottomDom

      allDom += `</div>`

      allDom += `<style>
        ::-webkit-scrollbar {
          width: 20px;
          background-color: #083c60 !important;
        }
        ::-webkit-scrollbar-track {
          background-color: #083c60 !important;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 10px !important;
          background-color: #018fd4 !important;
          box-shadow:inset   6px #fff !important;
        }
      </style>`
      this.el.innerHTML = allDom

      // 选择框
      this.selectAct()
      this.getSys()

      // tab
      this.tabAct()

      // 表格
      this.tableScroll()
      this.tableScroll2()

      // 饼图
      this.setPieOption(1, [])
      this.setPieOption(2, [])

      this.tableAction()
    }

    setSeriesStyle(__seriesStyle) {
      const defaultStyle = deepCopy(__seriesStyle) // 默认
    }

    destroy() {
      clearInterval(this.timer)
    }

    resize({ width, height }) {
      this.el.style.cssText += `;width: 512px;height: 681px;`
      // this.el.style.cssText += `;width:${width}px;height:${height}px;`
    }
  }

  return PIE
}
