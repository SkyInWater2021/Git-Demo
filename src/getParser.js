import { uniq } from 'lodash'
import defaultData from './defaultData.json'

export const dataKeyMap = {
  fileCount: 'FILE_COUNT',
  fileSizeCount: 'FILESIZE_COUNT',
  date: 'PERIOD_DATE',
  link: 'PROCESS_LINK'
}

// 处理数据
export function handleData(data = defaultData, config = dataKeyMap) {
  const dateKey = 'PERIOD_DATE'
  const fileCountKey = 'FILE_COUNT'
  const fileSizeCountKey = 'FILESIZE_COUNT'
  const linkKey = 'PROCESS_LINK'

  const xAxisData = uniq(data[dateKey].data).reverse()

  const collectionData = []
  const downCollectionData = []
  const distributeData = []
  const downloadDistributeData = []

  data[linkKey].data.forEach((link, index) => {
    if (link === 3) {
      distributeData.push(
        formatNumberAsGigabytes(data[fileSizeCountKey].data[index])
      )
    }

    if (link === 9) {
      collectionData.push(
        formatNumberAsGigabytes(data[fileSizeCountKey].data[index])
      )
      downCollectionData.push(data[fileCountKey].data[index])
    }

    if (link === 10) {
      downloadDistributeData.push(data[fileCountKey].data[index])
    }
  })

  return {
    xAxisData,
    collectionData,
    downCollectionData,
    distributeData,
    downloadDistributeData
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}

export function formatNumberAsGigabytes(number) {
  if (typeof number !== 'number') {
    throw new Error('Input must be a number')
  }

  if (number < 0) {
    throw new Error('Input must be a non-negative number')
  }

  const gigabyte = 1e9 // 1 G = 10^9

  const result = number / gigabyte

  const positiveLength = String(result).split('.')[0].length
  const fixedLength = 6 - positiveLength

  const formattedResult = result.toFixed(fixedLength < 0 ? 0 : fixedLength)

  return Number(formattedResult)
}
