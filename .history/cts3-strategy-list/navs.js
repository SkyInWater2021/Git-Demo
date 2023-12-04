export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-cts-strategy-list-id',
      defaultMessage: 'cts3策略列表'
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
