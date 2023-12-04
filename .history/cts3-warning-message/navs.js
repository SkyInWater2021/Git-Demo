export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-warning-message',
      defaultMessage: 'cts3告警信息'
    }),
    isPlugin: true,
    navCategory: 'charts.themes.multiChart',
    icon: 'basic.png'
  }
}

export function navs(intl) {
  return {
    basic: setBasicNav(intl)
  }
}
