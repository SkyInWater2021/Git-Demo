import response from './response.json'
import { formatArrayData } from './utils'

export const defaultData = formatArrayData(response.data)

export function handleData(data = defaultData, config) {
  console.log(data)
  const labelArr = [...data['USER_ID_NAME'].data]
  labelArr.unshift('国内气象通信系统-CTS')

  const length = labelArr.length + 1

  const population = labelArr.map((_, index) => {
    let arr = new Array(length).fill(0)

    if (index === 0) {
      arr = [...data['FILESIZE_COUNT'].data]
      arr.unshift(0)
    } else {
      arr[0] = data['FILESIZE_COUNT'].data[index - 1]
    }
    return arr
  })

  return { labelArr, population }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
