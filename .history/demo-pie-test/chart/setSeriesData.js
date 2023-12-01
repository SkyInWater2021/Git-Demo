export default function (series) {
  if (Array.isArray(series) && series[0].data && series[0].data.length > 0) {
    // const seriesStyle = this.style.get('series')
    if (this.option.series.length) {
      this.option.series[0].data = series[0].data
      this.option.series[0].name = series[0].name
    }
  }
  return this.option.series
}
