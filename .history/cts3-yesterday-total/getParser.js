import response from './response.json'
import { formatArrayData } from './utils'

export const defaultData = formatArrayData(response.data)

export function handleData(data = defaultData, config) {
  let total = 0 // 总量
  let average = 0 // 平均量
  let wavePercentage = '0' // 波动百分比
  let levelColor = ''
  let showWave = true

  const totalDataIndex = data['DATA_TYPE']?.data.findIndex((item) => !item)

  if (totalDataIndex !== -1) {
    const totalNumber = data['FILESIZE_COUNT'].data[totalDataIndex]
    const averageNumber = data['FILESIZE_AVG'].data[totalDataIndex]

    total = formatFileSize(totalNumber)
    average = formatFileSize(averageNumber)
    wavePercentage = (data['DATA_PCT'].data[totalDataIndex] * 100).toFixed(1)
    const type = data['DATA_PCT_TYPE'].data[totalDataIndex]
    if (type === 0) levelColor = '#5cc78f'
    if (type === 1) levelColor = '#f1ca6a'
    if (type === 2) levelColor = '#db6e66'

    if (!totalNumber || !averageNumber) showWave = false
  }

  return {
    total,
    average,
    wavePercentage,
    originData: data,
    levelColor,
    showWave
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
  const formattedSize = size.toFixed(6 - pSize)
  const unit = units[unitIndex]

  return `${formattedSize} ${unit}`
}
