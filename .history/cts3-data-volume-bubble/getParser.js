import response from './response.json'
import { formatArrayData } from './utils'

export const defaultData = formatArrayData(response.data)

export const colors = [
  '#9eca7f',
  '#f2ca6b',
  '#9263af',
  '#de6e6a',
  '#5a6fc0',
  '#ec8a5d',
  '#e889d4',
  '#255a92',
  '#9fc3fb',
  '#97a3b6',
  '#52b3d0',
  '#62baf3',
  '#838cf1',
  '#da7ff2',
  '#ea7987'
]

export function handleData(data = defaultData, config) {
  const seriesData = [
    {
      id: 'DATA_TYPE_FIRST_NAME',
      value: undefined,
      depth: 0,
      index: 0,
      _bColor: 'transparent',
      itemStyle: { color: 'white' },
      label: ''
    }
  ]

  data['FILESIZE_COUNT'].data.forEach((size, index) => {
    const detailsData = JSON.parse(data['detail'].data[index])

    const mainColor = colors[index % 15]

    const legendName = data['DATA_TYPE_FIRST_NAME'].data[index]

    seriesData.push({
      id: `DATA_TYPE_FIRST_NAME.${legendName}`,
      value: size,
      depth: 1,
      index: seriesData.length,
      dataIndex: index,
      _bColor: `${mainColor}88`,
      label: legendName,
      name: legendName
    })

    detailsData.forEach((detail) => {
      seriesData.push({
        id: `DATA_TYPE_FIRST_NAME.${legendName}.${detail['USER_ID']}`,
        value: detail['FILE_COUNT'],
        depth: 2,
        index: seriesData.length,
        dataIndex: index,
        _bColor: mainColor,
        label: detail['USER_ID_NAME'] + '_' + detail['USER_ID'],
        name: legendName,
        data: detail
      })
    })
  })

  return { seriesData, originData: data }
}

export default function () {
  return function (data, config = {}, map = {}) {
    return handleData(data, config)
  }
}
