export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'cts3-get-data-demo',
      defaultMessage: '获取平台接口数据测试组件'
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
