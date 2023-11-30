import option from './option'
import config from './config'
import dataConfig from './dataConfig'

import { setBasicNav } from '../../navs'

export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return {
    title: setBasicNav(intl).title,
    option: option(themeType, SHOWUTILS)
  }
}

export { config, dataConfig }
