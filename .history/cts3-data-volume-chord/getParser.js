import response from './response.json'
import { formatShowData } from './utils'

export const defaultData = formatShowData(response.data)

export function handleData(data = defaultData, config) {
  const chordData = []
  const firstNode = []
  const color = '#98dbdeFF'

  data['FILESIZE_COUNT'].data.forEach((count, index) => {
    const from = data['USER_ID_NAME'].data[index]
    const name = data['USER_ID_NAME'].data[index] + data['USER_ID'].data[index]
    const to = '国内气象通信系统-CTS'

    if (index === 0) {
      firstNode.push([to, to, 0, name, color, to])
    }

    chordData.push([from, to, count, name, color, from])
  })

  return {
    chordData,
    firstNode
  }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
