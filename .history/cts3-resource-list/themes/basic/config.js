export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return [
    {
      title: intl.formatMessage({ id: 'column', defaultMessage: '列表' }),
      type: 'list',
      fields: [
        {
          name: 'series_columns',
          label: intl.formatMessage({
            id: 'cts strategy list columns',
            defaultMessage: '列数'
          }),
          type: 'number',
          value: 2
        },
        {
          name: 'series_pageSize',
          label: intl.formatMessage({
            id: 'cts strategy list page size',
            defaultMessage: '每页个数'
          }),
          type: 'number',
          value: 6
        }
      ]
    }
  ]
}
