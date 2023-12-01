export default function (getMapName) {
  return function (data, config = {}, map = {}) {
    const legend = {}
    const series = []
    legend.data = []

    if (data) {
      const item = data[config.name]
      const values = data[config.value]
      if (item && item.data && values && values.data) {
        let seriesData = item.data.map((key, i) => {
          legend.data.push(getMapName(key, map))
          return {
            name: key,
            value: values.data[i] || 0
          }
        })
        seriesData = SeparatedData(seriesData)

        series.push({
          data: seriesData
        })
      }

      // 设置series的name
      if (series.length) {
        series[0].name = getMapName(config.value, map)
      }
    }

    return { legend, series }
  }

  function SeparatedData (array) {
    if (Array.isArray(array) && array[0]) {
      const data = array[0]
      const { value } = data
      if (
        value &&
        value.toString().includes('%') &&
        Number.isInteger(parseInt(value))
      ) {
        const parseData =
          parseInt(value) === parseFloat(value)
            ? parseInt(value)
            : parseFloat(value)
        const result = [parseData, 100 - parseData]
        const names = [data.name, '']
        return result.map((item, index) => {
          return {
            name: names[index],
            value: item
          }
        })
      }
      return array
    }
  }
}
