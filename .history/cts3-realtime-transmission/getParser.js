import { uniq } from 'lodash'
import response from './response.json'
import { formatArrayData } from './utils'

export const defaultData = formatArrayData(response.data)

export function handleData(data = defaultData, config) {
  console.log('🍎🍎🍎getParser调用用🍎🍎🍎:', data)

  const xAxisData = uniq(data['PERIOD_DATE'].data).reverse()

  const collectionData = []
  const downCollectionData = []
  const distributeData = []
  const downloadDistributeData = []

  data['PROCESS_LINK'].data.forEach((link, index) => {
    if (link === 3) {
      distributeData.push(data['FILE_COUNT'].data[index])
    }

    if (link === 9) {
      collectionData.push(data['FILE_COUNT'].data[index])
      downCollectionData.push(data['FILESIZE_COUNT'].data[index])
    }

    if (link === 10) {
      downloadDistributeData.push(data['FILESIZE_COUNT'].data[index])
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
