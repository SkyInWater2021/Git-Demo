export default function () {
  return [
    {
      name: 'total',
      type: 'select',
      label: '总量',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    },
    {
      name: 'average',
      type: 'select',
      label: '平均量',
      property: 'dimension',
      placeholder: '请选择对应的字段',
      isAddWSNeed: true
    }
  ]
}
