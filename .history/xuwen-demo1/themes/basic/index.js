import option from './option'
import config from './config'

export { config }

export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS
  return {
    title: '融入算法与产品清单',
    option: option(themeType, SHOWUTILS)
  }
}
