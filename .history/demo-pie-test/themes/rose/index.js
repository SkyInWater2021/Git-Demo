import option from './option'
import config from './config'
import { getRoseNav } from '../../navs'

export { config }

export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS
  return {
    title: getRoseNav(intl).title,
    option: option(themeType, SHOWUTILS)
  }
}
