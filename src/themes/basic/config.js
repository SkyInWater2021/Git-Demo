export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return [
    {
      title: intl.formatMessage({
        id: 'graph-bubble',
        defaultMessage: '气泡图'
      }),
      type: 'position',
      fields: [
        {
          name: 'series_size',
          label: intl.formatMessage({
            id: 'bubble-size',
            defaultMessage: '气泡大小'
          }),
          type: 'number',
          props: { min: 0.1, max: 1000 },
          value: 1
        },
        {
          name: 'series_gravity',
          label: intl.formatMessage({
            id: 'bubble-gravity',
            defaultMessage: '重力大小'
          }),
          type: 'number',
          props: { min: 0.01, max: 10 },
          value: 1
        }
      ]
    }
  ]
}
