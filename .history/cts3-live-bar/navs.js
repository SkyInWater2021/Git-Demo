export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-live-bar',
      defaultMessage: 'cts3实时传输情况'
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
