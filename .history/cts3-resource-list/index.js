import setBasic, { config, dataConfig } from './themes/basic'
import { CPN_NAME } from './constant'

export const name = CPN_NAME
export const styleSetGenerators = { basic: config }
export const dataConfigGenerators = { basic: dataConfig }

export function chartConfigGenerator(themeType = 'default', SHOWUTILS) {
  return { basic: setBasic(themeType, SHOWUTILS) }
}

export * from './default'
