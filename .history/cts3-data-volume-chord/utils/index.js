import { isObject } from 'lodash'
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
export function formatShowData(data = []) {
  const target = {}

  function processItem(item) {
    Object.keys(item).forEach((key) => {
      const val = item[key]
      const temp =
        Array.isArray(val) || isObject(val) ? JSON.stringify(val) : val

      if (!target[key]) {
        target[key] = { name: {}, data: [temp] }
      } else {
        target[key].data.push(temp)
      }
    })
  }

  if (Array.isArray(data)) {
    data.forEach(processItem)
  } else {
    processItem(data)
  }

  return target
}

export function formatFileSize(fileSize) {
  const units = ['B', 'KB', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  let size = fileSize
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  const pSize = String(size).split('.')[0].length // 正数部分长度
  const formattedSize = size.toFixed(5 - pSize)
  const unit = units[unitIndex]

  return `${formattedSize} ${unit}`
}

export function formatTimeStr(str) {
  const date = String(str)
  const year = date.slice(0, 4) + '年'
  const month = date.slice(4, 6) + '月'
  const day = date.slice(6, 8) + '日'
  const hour = date.slice(8) + '时'

  return `${year}${month}${day}${hour}`.replace(/(年|月|日时)$/, '') // 移除末尾的无效部分
}

export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
