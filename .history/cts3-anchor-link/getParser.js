import response from './response.json'
import { formatShowData } from './utils'

export const defaultData = formatShowData(response.data)

export function handleData(data = defaultData, config) {
  return {}
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
