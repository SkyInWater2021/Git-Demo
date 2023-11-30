import option from './option'
import config from './config'
import { getBasicNav } from '../../navs'

export { config }

export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS
  return {
    title: getBasicNav(intl).title,
    option: option(themeType, SHOWUTILS)
  }
}
