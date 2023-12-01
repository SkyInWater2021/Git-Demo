import defaultData from './defaultData.json'

export const dataKeyMap = {
  detail: 'detail',
  periodId: 'PERIOD_DATE',
  first: 'DATA_TYPE_FIRST',
  firstName: 'DATA_TYPE_FIRST_NAME',
  fileCount: 'FILE_COUNT',
  fileSizeCount: 'FILESIZE_COUNT'
}

// 处理数据
export function handleData(data = defaultData, config = dataKeyMap) {
  console.log(data)
  return {}
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
