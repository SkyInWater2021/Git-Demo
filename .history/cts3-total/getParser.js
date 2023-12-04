import defaultData from './defaultData.json'

export const dataKeyMap = {
  total: 'FILESIZE_COUNT',
  average: 'FILESIZE_AVG',
  dataType: 'DATA_TYPE'
}

// 处理数据
export function handleData(data = defaultData, config = dataKeyMap) {
  let total = 0 // 总量
  let average = 0 // 平均量
  let wavePercentage = '0' // 波动百分比

  const totalKey = config.total
  const averageKey = config.average

  const totalDataIndex = data['DATA_TYPE']?.data.findIndex((item) => !item)

  if (totalDataIndex !== -1) {
    const totalNumber = data[totalKey].data[totalDataIndex]
    const averageNumber = data[averageKey].data[totalDataIndex]

    total = formatNumberAsGigabytes(totalNumber)
    average = formatNumberAsGigabytes(averageNumber)
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

export function formatNumberAsGigabytes(number) {
  if (typeof number !== 'number') {
    throw new Error('Input must be a number')
  }

  if (number < 0) {
    throw new Error('Input must be a non-negative number')
  }

  const gigabyte = 1024 * 1024 * 1024

  const result = number / gigabyte

  const positiveLength = String(result).split('.')[0].length
  const fixedLength = 6 - positiveLength

  const formattedResult = result.toFixed(fixedLength < 0 ? 0 : fixedLength)

  return `${formattedResult}G`
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
