import response from './response.json'
import { formatArrayData, formatDate } from './utils'

export const defaultData = formatArrayData(response.data)

export function handleData(data = defaultData, config) {
  const ips = []
  const nodes = []
  const seriesData = []
  const xAxisData = []

  data['node'].data.forEach((nodeName, index) => {
    const time = formatDate(new Date(data['periodDate'].data[index]))
    const ip = data['ip'].data[index]
    const value = (data['flumePct'].data[index] * 100).toFixed(2)

    if (!xAxisData.includes(time)) xAxisData.push(time)
    if (!ips.includes(ip)) ips.push(ip)
    if (!nodes.includes(nodeName)) {
      nodes.push(nodeName)
      seriesData[nodeName] = { data: [value], ip: ip }
    } else {
      seriesData[nodeName].data.push(value)
      seriesData[nodeName].ip = ip
    }
  })

  return { seriesData, xAxisData, ips, nodes }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
