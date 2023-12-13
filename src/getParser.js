import defaultData from './defaultData.json'

export const dataKeyMap = {
  detail: 'detail'
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
