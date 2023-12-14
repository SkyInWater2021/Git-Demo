import response from './response.json'
import { formatShowData } from './utils'

export const defaultData = formatShowData(response.data)

export function handleData(data = defaultData, config) {
  const chordData = []
  data['FILESIZE_COUNT'].data.forEach((count, index) => {
    const to = data['USER_ID_NAME'].data[index]
    const name = data['USER_ID_NAME'].data[index] + data['USER_ID'].data[index]
    chordData.push(['国内气象通信系统-CTS', to, count, name])
  })

  return {
    chordData
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
