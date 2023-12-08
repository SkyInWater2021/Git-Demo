import { isArray, isObject } from 'lodash'
import { CPN_NAME } from '../constant'

export function randomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  const maxPos = chars.length
  let str = ''
  for (let i = 0; i < 10; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str + CPN_NAME
}

// 将接口数据转为平台返回的数据格式
export function formatArrayData(data = []) {
  const target = {}

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      const val = item[key]
      const temp = isArray(val) || isObject(val) ? JSON.stringify(val) : val

      target[key]
        ? target[key].data.push(temp)
        : (target[key] = { name: {}, data: [temp] })
    })
  })

  return target
}
