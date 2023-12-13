export const hasDataConfigPanel = true
export const themeConfig = {
  'multiple.first': [],
  'multiple.second': [],
  'single.first': [],
  'single.second': []
}

export { locale } from './locale'
export { navs } from './navs'
export { Chart } from './chart'

export { default as getParser } from './getParser'
export { default as getCustomPropties } from './getCustomPropties'

const timer = setInterval(() => {
  if (process.env.NODE_ENV === 'development') {
    const rowElement = document.querySelector('.uyun-row')

    if (rowElement) {
      clearInterval(timer)
      const firstChild = rowElement.children[0]
      const secondChild = rowElement.children[1]

      if (firstChild) {
        firstChild.style.width = '0'
      }

      if (secondChild) {
        secondChild.style.width = '100%'
        secondChild.style.background = '#0d1a2a'
      }
    }
  }
})
