import basic, { config as basicConfig } from './themes/basic'
import rose, { config as roseConfig } from './themes/rose'
import dataConfig from './themes/dataConfig'

// 图表名称，英文
export const name = 'testpiecss'

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
    rose: rose(themeType, SHOWUTILS)
  }
}

// 图形配置映射
export const styleSetGenerators = {
  basic: basicConfig,
  rose: roseConfig
}

export const hasDataConfigPanel = true

// 数据配置映射
export const dataConfigGenerators = {
  basic: dataConfig,
  rose: dataConfig
}

// 颜色主题系列
export const themeConfig = {
  // {type}-{theme}
  'multiple.first': ['piepie-basic', 'piepie-rose'],
  'multiple.second': [],
  'single.first': [],
  'single.second': []
}
