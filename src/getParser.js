import * as echarts from 'echarts'
import response from './response.json'
import { formatArrayData } from './utils'

export const defaultData = formatArrayData(response.data)

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

export function handleData(data = defaultData, config) {
  const legendData = []
  const seriesData = [
    {
      id: 'DATA_TYPE_FIRST_NAME',
      value: undefined,
      depth: 0,
      index: 0,
      color: 'transparent',
      label: ''
    }
  ]

  const categoryData = []

  data['DATA_TYPE_FIRST_NAME'].data.forEach((name, index) => {
    const detailsData = JSON.parse(data['detail'].data[index])

    const mainColor = colors[index % 15]

    const color = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
      { offset: 1, color: `${mainColor}` },
      { offset: 0.8, color: `${mainColor}11` },
      { offset: 0, color: `${mainColor}00` }
    ])

    legendData.push({
      name,
      itemStyle: {
        color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
          { offset: 1, color: `${mainColor}` },
          { offset: 0.5, color: `${mainColor}33` },
          { offset: 0, color: `${mainColor}00` }
        ])
      }
    })
    categoryData.push({ name: name, itemStyle: { color: color } })

    seriesData.push({
      id: `DATA_TYPE_FIRST_NAME.${name}`,
      value: data['FILESIZE_COUNT'].data[index],
      depth: 1,
      index: seriesData.length,
      color,
      label: name,
      name: name
    })

    detailsData.forEach((detail) => {
      seriesData.push({
        id: `DATA_TYPE_FIRST_NAME.${name}.${detail['USER_ID']}`,
        value: detail['FILE_COUNT'],
        depth: 2,
        index: seriesData.length,
        color,
        label: detail['USER_ID_NAME'] + '_' + detail['USER_ID'],
        name: name
      })
    })
  })

  return {
    legendData,
    seriesData,
    categoryData
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
