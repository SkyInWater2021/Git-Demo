export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS
  return [
    {
      title: intl.formatMessage({ id: 'rose', defaultMessage: '玫瑰图' }),
      type: 'position',
      fields: [
        // 'series_circleMode',
        'series_startAngle',
        'series_center_0',
        'series_center_1',
        {
          name: 'series_radius_0',
          value: 20
        },
        {
          name: 'series_radius_1',
          value: 55
        }
      ]
    },
    {
      title: intl.formatMessage({
        id: 'value label',
        defaultMessage: '值标签'
      }),
      type: 'labelValue',
      fields: [
        'series_label_normal_show',
        'series_label_normal_formatter',
        'series_label_normal_textStyle',
        'series_label_normal_position',
        'series_labelLine_normal_show',
        'series_labelLine_normal_length'
      ]
    },
    {
      title: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
      type: 'legend',
      fields: ['legend_show', 'legend_textStyle', 'legend_position']
    },
    {
      title: intl.formatMessage({ id: 'render', defaultMessage: '渲染' }),
      type: 'render',
      fields: [
        {
          name: 'render_effect',
          label: intl.formatMessage({ id: 'effect', defaultMessage: '效果' }),
          type: 'select',
          action: 'toggle',
          value: 'none',
          props: {
            options: [
              {
                label: intl.formatMessage({ id: 'none' }),
                value: 'none'
              },
              {
                label: intl.formatMessage({ id: 'halo' }),
                value: 'halo'
              }
            ]
          }
        },
        {
          name: 'render_config',
          type: 'renderSlider',
          rel: 'toggle:render_effect!=none',
          value: {
            min: 0,
            max: 100,
            precision: 1,
            values: null,
            styles: [undefined]
          }
        }
      ]
    }
  ]
}
