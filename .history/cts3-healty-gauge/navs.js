export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-health-pie-id',
      defaultMessage: 'cts3健康状态饼图'
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
