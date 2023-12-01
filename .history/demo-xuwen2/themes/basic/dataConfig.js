export default function (SHOWUTILS) {
  const { intl } = SHOWUTILS
  return [
    {
      name: 'name',
      type: 'select',
      label: intl.formatMessage({
        id: 'category series',
        defaultMessage: '分类系列'
      }),
      property: 'dimension', // 维度
      placeholder: intl.formatMessage({
        id: 'please select the field corresponding to the category series'
      }),
      isAddWSNeed: true
    },
    {
      name: 'value',
      type: 'select',
      label: intl.formatMessage({ id: 'series', defaultMessage: '值系列' }),
      property: 'measure', // 度量
      placeholder: intl.formatMessage({
        id: 'please select the corresponding field for the series'
      }),
      isAddWSNeed: true
    }
  ]
}
