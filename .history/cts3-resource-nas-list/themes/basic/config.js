export const href = 'http://10.40.120.50:8080/cts/login/userLoginView.action'

export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return [
    {
      title: intl.formatMessage({
        id: 'href-config',
        defaultMessage: '页面跳转'
      }),
      type: 'position',
      fields: [
        {
          name: 'series_href',
          label: intl.formatMessage({
            id: 'series_href_id',
            defaultMessage: '跳转地址'
          }),
          type: 'input',
          value: href
        }
      ]
    }
  ]
}
