export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-resource-list',
      defaultMessage: 'cts3资源分配列表'
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
