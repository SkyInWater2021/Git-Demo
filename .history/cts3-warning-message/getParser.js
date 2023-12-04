import defaultData from './defaultData.json'

// 处理数据
export function handleData(data = defaultData, config) {
  const title = data['EVENT_TITLE'].data[0]
  const count = data['TITLE_COUNT'].data[0]
  const time = data['EVENT_TIME'].data[0]

  return {
    title,
    count,
    time
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
