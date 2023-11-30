import setBubble, { config, dataConfig } from './themes/bubble'

export const name = 'graph'

export const styleSetGenerators = { bubble: config }
export const dataConfigGenerators = { bubble: dataConfig }

export function chartConfigGenerator(themeType = 'default', SHOWUTILS) {
  return { bubble: setBubble(themeType, SHOWUTILS) }
}

export * from './default'
