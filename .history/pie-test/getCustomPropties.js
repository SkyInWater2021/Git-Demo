import { getBasicHollowNav, getRoseFillNav } from './navs'

export default intl => ({
  'basic.hollow': {
    title: getBasicHollowNav(intl).title,
    custom: {
      series_radius_0: 36 // eslint-disable-line
    }
  },
  'rose.fill': {
    // eslint-disable-next-line
    title: getRoseFillNav(intl).title,
    custom: {
      series_radius_0: 0 // eslint-disable-line
    }
  }
})
