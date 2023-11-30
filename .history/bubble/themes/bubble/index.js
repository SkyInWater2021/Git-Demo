import option from './option'
import config from './config'
import dataConfig from './dataConfig'

import { getBubbleGraph } from '../../navs'

export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return {
    title: getBubbleGraph(intl).title,
    option: option(themeType, SHOWUTILS)
  }
}

export { config, dataConfig }
