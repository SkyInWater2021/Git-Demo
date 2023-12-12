import response from './response.json'
import { formatArrayData, formatDate } from './utils'

export const defaultData = formatArrayData(response.data)

export function handleData(data = defaultData, config) {
  const res = {
    0: { label: '接入', data: [] },
    1: { label: '收集', data: [] },
    2: { label: '处理', data: [] },
    3: { label: '分发', data: [] }
  }

  const xAxisData = []

  data['policyType'].data.forEach((item, index) => {
    const time = formatDate(new Date(data['periodDate'].data[index]))
    if (!xAxisData.includes(time)) {
      xAxisData.push(time)
    }

    res[item].data.push(data['mqCount'].data[index])
  })

  return { res, xAxisData }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
