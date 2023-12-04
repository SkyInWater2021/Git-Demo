import defaultData from './defaultData.json'

export const dataKeyMap = {
  detail: 'detail'
}

// 处理数据
export function handleData(data = defaultData, config = dataKeyMap) {
  console.log(data, config)

  const titleType = config.type ?? '类别'
  const titleText = config.title ?? '默认标题'

  return {
    titleType,
    titleText
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
