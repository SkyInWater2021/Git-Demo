import deepCopy from 'lodash/cloneDeep'

const positionMap = {
  top: {
    top: 'top',
    right: '5%',
    orient: 'horizontal'
  },
  right: {
    left: 'right',
    top: 'middle',
    orient: 'vertical'
  },
  bottom: {
    top: 'bottom',
    right: '5%',
    orient: 'horizontal'
  },
  left: {
    left: 'left',
    top: 'middle',
    orient: 'vertical'
  }
}

export default function setLegendStyle (legendStyle) {
  legendStyle = deepCopy(legendStyle)
  const { legend, dataZoom } = this.option
  if (legendStyle.position) {
    delete legend.top
    delete legend.right
    delete legend.bottom
    delete legend.left
    delete legend.orient

    const position = positionMap[legendStyle.position]
    Object.assign(legend, position)

    if (dataZoom && dataZoom[0] && dataZoom[0].show) {
      if (this.dataZoomMark === 'right') { // dataZoom在右
        if (legendStyle.position === 'right') {
          delete legend.left
          legend.right = dataZoom[0].width
        }
      } else if (legendStyle.position === 'bottom') {
        delete legend.top
        legend.bottom = dataZoom[0].height
      }
    }
    delete legendStyle.position
  }

  // 统一图例失效颜色
  legendStyle.inactiveColor = 'rgba(72,97,122,.85)'

  Object.assign(legend, legendStyle)
}
