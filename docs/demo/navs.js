
/**
 *
 * navCategory 可选项见 show 项目中文件 src/pages/editor/widget/navs.js
 *
 */
export function getBasicNav(intl) {
  return {
    title: '数据存储分类',
    isPlugin: true,
    navCategory: 'charts.themes.multiChart',
    icon: 'basic.png'
  }
}

/**
 * 导出导航菜单配置
 */
export function navs(intl) {
  return {
    basic: getBasicNav(intl),
  }
}
