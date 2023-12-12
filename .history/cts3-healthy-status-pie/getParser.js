import response from './response.json'
import { formatShowData, formatDate } from './utils'

export const defaultData = formatShowData(response.data)

export function handleData(data = defaultData, config) {
  const pieData = []

  const labels = ['linkName', 'colName', 'dealName', 'distName']
  const values = ['linkPct', 'colPct', 'dealPct', 'distPct']

  labels.forEach((key, index) => {
    pieData.push({
      label: data[key].data[0],
      value: data[values[index]].data[0],
      date: formatDate(new Date(data.utime.data[0]))
    })
  })

  return {
    pieData
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
