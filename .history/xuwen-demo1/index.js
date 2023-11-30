import basic, { config as basicConfig } from './themes/basic'
import dataConfig from './themes/basic/dataConfig'

// 图表名称，英文
export const name = 'productlist'

// 导出图表
export { Chart } from './chart'

// 翻译文件
export { locale } from './locale'

// 导航配置
export { navs } from './navs'

export { default as getParser } from './getParser'

// 自定义配置
export { default as getCustomPropties } from './getCustomPropties'

// 图表默认数据
export function chartConfigGenerator(themeType = 'default', SHOWUTILS) {
  return {
    basic: basic(themeType, SHOWUTILS),
  }
}

// 图形配置映射
export const styleSetGenerators = {
  basic: basicConfig,
}

export const hasDataConfigPanel = true
// 数据配置映射
export const dataConfigGenerators = {
  basic: dataConfig,
}

// 颜色主题系列
export const themeConfig = {
  // {type}-{theme}
  'multiple.first': [],
  'multiple.second': [],
  'single.first': [],
  'single.second': []
}
