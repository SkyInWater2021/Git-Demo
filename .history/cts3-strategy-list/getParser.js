import response from './response.json'
import { formatShowData } from './utils'

export const defaultData = formatShowData(response.data)

export function handleData(data = defaultData, config) {
  const itemData = data['item'].data.map((item) => JSON.parse(item))
  const policyName = data['policyName'].data
  const policyTitle = data['policyTitle'].data

  return { itemData, policyName, policyTitle }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
