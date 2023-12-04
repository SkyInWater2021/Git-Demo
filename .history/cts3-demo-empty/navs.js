export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-demo-empty',
      defaultMessage: 'demo-empty'
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
