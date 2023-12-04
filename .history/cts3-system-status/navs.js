export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-system-status-id',
      defaultMessage: 'cts3系统状态折线图'
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
