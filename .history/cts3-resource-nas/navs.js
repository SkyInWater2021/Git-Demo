export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-resource-NAS',
      defaultMessage: 'cts3资源分配NAS'
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
