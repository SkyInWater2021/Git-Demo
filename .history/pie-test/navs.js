
/**
 *
 * navCategory 可选项见 show 项目中文件 src/pages/editor/widget/navs.js
 *
 */
export function getBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'piepie-basic-new',
      defaultMessage: '测试css'
    }),
    isPlugin: true,
    navCategory: 'charts.themes.multiChart',
    icon: 'basic.png'
  }
}

export function getRoseNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'piepie-rose-new',
      defaultMessage: '测试css2 new'
    }),
    isPlugin: true,
    navCategory: 'charts.themes.multiChart',
    icon: 'rose.png'
  }
}

export function getBasicHollowNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'piepie-basic-hollow-new',
      defaultMessage: '测试css1 new'
    }), // eslint-disable-line
    isPlugin: true,
    navCategory: 'charts.themes.multiChart',
    icon: 'basic-hollow.png'
  }
}

export function getRoseFillNav(intl) {
  return {
    title: intl.formatMessage({
      id: 'piepie-rose-fill-new',
      defaultMessage: '测试css3 new'
    }),
    isPlugin: true,
    navCategory: 'charts.themes.singleChart',
    icon: 'rose-fill.png'
  }
}

/**
 * 导出导航菜单配置
 */
export function navs(intl) {
  return {
    basic: getBasicNav(intl),
    rose: getRoseNav(intl),
    'basic.hollow': getBasicHollowNav(intl),
    'rose.fill': getRoseFillNav(intl)
  }
}
