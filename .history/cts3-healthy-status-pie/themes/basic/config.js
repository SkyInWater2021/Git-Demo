export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return [
    {
      title: intl.formatMessage({
        id: 'barConfig',
        defaultMessage: '实时传输情况'
      }),
      type: 'grid',
      fields: [
        {
          name: 'series_gridLeft',
          label: intl.formatMessage({
            id: 'series_gridLeft',
            defaultMessage: '左边距离'
          }),
          type: 'number',
          value: 80
        },
        {
          name: 'series_gridRight',
          label: intl.formatMessage({
            id: 'series_gridRight',
            defaultMessage: '右边距离'
          }),
          type: 'number',
          value: 120
        }
      ]
    }
  ]
}
