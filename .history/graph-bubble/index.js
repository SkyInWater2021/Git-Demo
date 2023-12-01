import setBasic, { config, dataConfig } from './themes/basic'

export const name = 'ctsBubble'

export const styleSetGenerators = { basic: config }
export const dataConfigGenerators = { basic: dataConfig }

export function chartConfigGenerator(themeType = 'default', SHOWUTILS) {
  return { basic: setBasic(themeType, SHOWUTILS) }
}

export * from './default'
