export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return [
    {
      title: intl.formatMessage({
        id: 'wave-status',
        defaultMessage: '波动异常'
      }),
      type: 'position',
      fields: [
        {
          name: 'series_unusual',
          label: intl.formatMessage({
            id: 'series_unusual-range',
            defaultMessage: '异常波动阈值'
          }),
          type: 'number',
          props: { min: 1, max: 100 },
          value: 10
        },
        {
          name: 'series_fatalException',
          label: intl.formatMessage({
            id: 'series_fatalException-range',
            defaultMessage: '严重异常波动阈值'
          }),
          type: 'number',
          props: { min: 1, max: 100 },
          value: 30
        }
      ]
    }
  ]
}
