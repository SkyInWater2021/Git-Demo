export default function (SHOWUTILS) {
  const { intl } = SHOWUTILS
  return [
    {
      name: 'value1',
      type: 'select',
      label: '中间部分',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
    {
      name: 'value2',
      type: 'select',
      label: '要素数据库',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
    {
      name: 'value3',
      type: 'select',
      label: '历史分析库',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
    {
      name: 'value4',
      type: 'select',
      label: '大文件存储库',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
    {
      name: 'value5',
      type: 'select',
      label: '小文件存储库',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
    {
      name: 'value6',
      type: 'select',
      label: '实时应用库',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
    {
      name: 'value7',
      type: 'select',
      label: '空间分析库',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
  ]
}
