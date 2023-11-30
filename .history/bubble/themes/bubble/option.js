import echarts from 'echarts'
import jsonData from '../../json/bubble-graph.json'

export default function (themeType, SHOWUTILS) {
  return Object.assign(
    {},
    {
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      legend: [
        {
          data: jsonData.nodes.map((a) => a.label),
          textStyle: { color: 'white' },
          icon: 'circle'
        }
      ],

      series: [
        {
          type: 'graph',
          layout: 'force',
          draggable: true,
          roam: true,
          label: { show: true, color: 'white' },
          labelLayout: { align: 'center', fontSize: 16 },

          data: jsonData.nodes.map(function (node) {
            return {
              name: node.label,
              symbolSize: node.size,
              itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                  { offset: 1, color: `${node.color}` },
                  { offset: 0.7, color: `${node.color}88` },
                  { offset: 0, color: `${node.color}33` }
                ])
              }
            }
          }),

          categories: jsonData.nodes.map(function (node) {
            return { name: node.label, itemStyle: { color: node.color } }
          }),

          emphasis: {
            focus: 'adjacency',
            label: { align: 'center', show: true }
          }
        }
      ]
    }
  )
}
