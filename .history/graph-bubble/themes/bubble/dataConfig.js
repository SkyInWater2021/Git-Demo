export default function (SHOWUTILS) {
  const { intl } = SHOWUTILS

  return [
    {
      name: 'label',
      type: 'select',
      label: intl.formatMessage({ id: 'series', defaultMessage: '气泡文字' }),
      property: 'bubble-label',
      placeholder: intl.formatMessage({
        id: 'please select the corresponding field for the bubble label'
      }),
      isAddWSNeed: true
    },
    {
      name: 'color',
      type: 'select',
      label: intl.formatMessage({ id: 'series', defaultMessage: '气泡颜色' }),
      property: 'bubble-color',
      placeholder: intl.formatMessage({
        id: 'please select the corresponding field for the bubble color'
      }),
      isAddWSNeed: true
    },
    {
      name: 'size',
      type: 'select',
      label: intl.formatMessage({
        id: 'bubble-size',
        defaultMessage: '气泡大小'
      }),
      property: 'bubble-size',
      placeholder: intl.formatMessage({
        id: 'please select the field corresponding to the bubble size'
      }),
      isAddWSNeed: true
    }
  ]
}
