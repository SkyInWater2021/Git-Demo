import echarts from 'echarts'
import { uniqueId } from 'lodash'
import defaultData from './defaultData.json'

export const dataKeyMap = {
  detail: 'detail',
  periodId: 'PERIOD_DATE',
  first: 'DATA_TYPE_FIRST',
  firstName: 'DATA_TYPE_FIRST_NAME',
  fileCount: 'FILE_COUNT',
  fileSizeCount: 'FILESIZE_COUNT'
}

export const colors = [
  '#9eca7f',
  '#f2ca6b',
  '#9263af',
  '#de6e6a',
  '#5a6fc0',
  '#ec8a5d',
  '#e889d4',
  '#255a92',
  '#9fc3fb',
  '#97a3b6',
  '#52b3d0',
  '#62baf3',
  '#838cf1',
  '#da7ff2',
  '#ea7987'
]

// 处理数据
export function handleData(data = defaultData, config = dataKeyMap) {
  const detailKey = config.detail
  const filenameKey = config.firstName

  const legendData = data[filenameKey].data
  const seriesData = []
  const categoryData = []

  data[filenameKey].data.forEach((name, index) => {
    const detailsData = data[detailKey].data

    const mainColor = colors[index % 15]

    const color = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
      { offset: 1, color: `${mainColor}` },
      { offset: 0.7, color: `${mainColor}99` },
      { offset: 0, color: `${mainColor}55` }
    ])

    categoryData.push({
      name: name,
      itemStyle: {
        color: color
      }
    })

    detailsData.forEach((detail) => {
      let size =
        (detail['FILE_COUNT'] / data[dataKeyMap.fileCount].data[index]) * 0.1
      if (size < 5) size = 5
      if (size > 100) size = 100

      seriesData.push({
        id: uniqueId(),
        name: detail['USER_ID_NAME'],
        symbolSize: size,
        value: detail['FILE_COUNT'],
        category: index,
        itemStyle: { color: color },
        label: { show: size > 50, color: 'white', fontSize: 12 },
        emphasis: {
          label: { align: 'center', show: true }
        }
      })
    })
  })

  const linksData = []

  return {
    legendData,
    seriesData,
    categoryData,
    linksData
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
