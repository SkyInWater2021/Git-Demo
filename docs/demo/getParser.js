export default function (getMapName) {
  return function (data, config = {}, map = {}) {
    const series = [];
    if (data) {
      // const values = [data['A'], data['B'], data['C'],data['D'],data['E'],data['F'],data['G']]
      const values = [
        data[config.value1],
        data[config.value2],
        data[config.value3],
        data[config.value4],
        data[config.value5],
        data[config.value6],
        data[config.value7],
      ];
      if (values) {
        let seriesData = [];
        for (let i = 0; i < 7; i++) {
          seriesData.push({
            name: values[i].name,
            value: values[i].data || 0,
          });
        }
        series.push({
          data: seriesData,
        });
      }
    }

    return { series };
  };
}
