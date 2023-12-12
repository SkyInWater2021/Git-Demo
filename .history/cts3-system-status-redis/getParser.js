import response from './response.json'
import { formatArrayData, formatDate } from './utils'

export const defaultData = formatArrayData(response.data)

export function handleData(data = defaultData, config) {
  const xAxisData = []
  const seriesData = []
  const groups = []

  data.points.data.forEach((item, index) => {
    const tempData = []
    const tempObj = JSON.parse(item)
    Object.keys(tempObj).forEach((key) => {
      if (index === 0) {
        xAxisData.push(formatDate(new Date(Number(key))))
      }
      tempData.push((tempObj[key] * 100).toFixed(2))
    })

    seriesData.push(tempData)
    groups.push(JSON.parse(data.group.data[index]))
  })

  return { xAxisData, seriesData, groups }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
