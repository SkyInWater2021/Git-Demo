export function getBubbleGraph(intl) {
  return {
    title: intl.formatMessage({
      id: 'graph-bubble',
      defaultMessage: '数据分发总量气泡图'
    }),
    isPlugin: true,
    navCategory: 'charts.themes.multiChart',
    icon: 'basic.png'
  }
}

export function navs(intl) {
  return {
    bubble: getBubbleGraph(intl)
  }
}
