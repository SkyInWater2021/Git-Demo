export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'totalCompare',
      defaultMessage: '昨日总量'
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
