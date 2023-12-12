import response from './response.json'
import { formatShowData } from './utils'

export const defaultData = formatShowData(response.data)

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
