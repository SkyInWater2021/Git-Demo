import response from './response.json'
import { formatArrayData } from './utils'

export const defaultData = formatArrayData(response.data)

export function handleData(data = defaultData, config) {
  console.log('🍎🍎🍎getParser调用用🍎🍎🍎:', data)

  let total = 0 // 总量
  let average = 0 // 平均量
  let wavePercentage = '0' // 波动百分比

  // TODO 波动异常判断
  // ...

  // TODO 波动百分比后端返回
  // ...

  const totalDataIndex = data['DATA_TYPE']?.data.findIndex((item) => !item)
  if (totalDataIndex !== -1) {
    const totalNumber = data['FILESIZE_COUNT'].data[totalDataIndex]
    const averageNumber = data['FILESIZE_AVG'].data[totalDataIndex]

    total = formatFileSize(totalNumber)
    average = formatFileSize(averageNumber)
    wavePercentage = (
      ((totalNumber - averageNumber) / averageNumber) *
      100
    ).toFixed(1)
  }

  return {
    total,
    average,
    wavePercentage,
    originData: data
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}

export function formatFileSize(fileSize) {
  const units = ['B', 'KB', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  let size = fileSize
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  const pSize = String(size).split('.')[0].length // 正数部分长度
  const formattedSize = size.toFixed(5 - pSize)
  const unit = units[unitIndex]

  return `${formattedSize} ${unit}`
}
