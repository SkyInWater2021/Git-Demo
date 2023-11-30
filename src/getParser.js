import fetchData from './fetchData.json'

export const dataKeyMap = {
  total: 'FILESIZE_COUNT',
  average: 'FILESIZE_AVG',
  dataType: 'DATA_TYPE'
}

// 处理数据
export function handleData(data = fetchData, config = dataKeyMap) {
  let total = 0 // 总量
  let average = 0 // 平均量
  let wavePercentage = '2' // 波动百分比

  const totalKey = config.total
  const averageKey = config.average

  const totalDataIndex = data['DATA_TYPE']?.data.findIndex((item) => !item)

  if (totalDataIndex !== -1) {
    const totalNumber = data[totalKey].data[totalDataIndex]
    const averageNumber = data[averageKey].data[totalDataIndex]

    total = formatNumberAsGigabytes(totalNumber)
    average = formatNumberAsGigabytes(averageNumber)
    wavePercentage = ((totalNumber / averageNumber) * 100).toFixed(1)
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

export function formatNumberAsGigabytes(number) {
  // 检查输入是否为数字
  if (typeof number !== 'number') {
    throw new Error('Input must be a number')
  }

  // 检查输入是否为正数
  if (number < 0) {
    throw new Error('Input must be a non-negative number')
  }

  // 定义G的单位值
  const gigabyte = 1e9 // 1 G = 10^9

  // 计算数字除以G的值
  const result = number / gigabyte

  // 使用toFixed方法将结果格式化为字符串，保留两位小数
  const formattedResult = result.toFixed(3)

  // 返回带有"G"单位的字符串
  return `${formattedResult}G`
}
