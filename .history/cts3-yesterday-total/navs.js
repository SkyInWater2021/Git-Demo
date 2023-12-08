import { CPN_NAME, CPN_TITLE, PAGE_NAME } from './constant'

export function setBasicNav(intl) {
  return {
    title: intl.formatMessage({
      id: `nav-${CPN_NAME + PAGE_NAME}`,
      defaultMessage: CPN_TITLE
    }),
    isPlugin: true,
    navCategory: 'charts.themes.multiChart',
    icon: 'basic.png'
  }
}

export function navs(intl) {
  return {
    basic: setBasicNav(intl)
  }
}
