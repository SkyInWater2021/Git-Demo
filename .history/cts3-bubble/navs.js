export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-bubble',
      defaultMessage: 'cts3气泡图'
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
