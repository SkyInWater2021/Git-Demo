export default function (themeType, SHOWUTILS) {
  const { intl, style } = SHOWUTILS
  return [
    {
      title: intl.formatMessage({ id: 'pie', defaultMessage: '饼图' }),
      type: 'position',
      fields: [
        {
          name: 'series_radius_0',
          label: intl.formatMessage({ id: 'inner radius', defaultMessage: '内半径' }),
          type: 'number',
          suffix: '%',
          props: {
            min: 0,
            max: 100
          },
          value: 0
        },
        {
          name: 'series_radius_1',
          label: intl.formatMessage({ id: 'outer radius', defaultMessage: '外半径' }),
          type: 'number',
          suffix: '%',
          props: {
            min: 0,
            max: 100
          },
          value: 90
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
        {
          name: 'series_label_show',
          label: intl.formatMessage({ id: 'label', defaultMessage: '标签' }),
          type: 'checkbox',
          action: 'toggle',
          value: false
        },
        {
          name: 'series_label_formatter',
          rel: 'toggle:series_label_show',
          label: intl.formatMessage({ id: 'format', defaultMessage: '格式' }),
          type: 'radioGroup',
          props: {
            options: [
              {
                name: intl.formatMessage({ id: 'value', defaultMessage: '值' }),
                value: '{c}'
              },
              {
                name: intl.formatMessage({ id: 'value%', defaultMessage: '值%' }),
                value: '{c}%'
              },
              {
                name: intl.formatMessage({ id: 'name', defaultMessage: '名称' }),
                value: '{b}'
              },
              {
                name: intl.formatMessage({ id: 'name: value', defaultMessage: '名称 ：值' }),
                value: '{b} : {c}'
              },
              {
                name: intl.formatMessage({ id: 'name: value%', defaultMessage: '名称 ：值%' }),
                value: '{c}%\n{b}'
              }
            ]
          },
          value: '{c}'
        },
        {
          type: 'compose',
          rel: 'toggle:series_label_show',
          label: intl.formatMessage({ id: 'size number', defaultMessage: '字号' }),
          fields: [
            {
              name: 'series_label_textStyle_fontSize',
              type: 'fontSizeSelect',
              value: style.fontSize
            },
            {
              name: 'series_label_textStyle_color',
              type: 'color',
              value: style.fontColor
            }
          ]
        },
        {
          name: 'series_label_position',
          label: intl.formatMessage({ id: 'position', defaultMessage: '位置' }),
          type: 'radioGroup',
          rel: 'toggle:series_label_show',
          props: {
            options: [
              {
                name: intl.formatMessage({ id: 'inside', defaultMessage: '内部' }),
                value: 'inside'
              }, {
                name: intl.formatMessage({ id: 'outside', defaultMessage: '外部' }),
                value: 'top'
              }, {
                name: intl.formatMessage({ id: 'circle center', defaultMessage: '圆中心' }),
                value: 'center'
              }
            ]
          },
          value: 'inside'
        },
        {
          name: 'series_labelLine_show',
          rel: 'toggle:series_label_show,series_label_position=top',
          label: intl.formatMessage({ id: 'label lines', defaultMessage: '标签线' }),
          type: 'checkbox',
          action: 'toggle',
          value: true
        },
        {
          name: 'series_labelLine_length',
          label: intl.formatMessage({ id: 'length', defaultMessage: '标签线长' }),
          type: 'number',
          rel: 'toggle:series_label_show,series_labelLine_show,series_label_position=top',
          value: 10
        }
      ]
    },
    {
      title: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
      type: 'legend',
      fields: [
        {
          name: 'legend_show',
          label: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
          type: 'checkbox',
          value: true,
          action: 'toggle'
        },
        {
          type: 'compose',
          rel: 'toggle:legend_show',
          label: intl.formatMessage({ id: 'size number', defaultMessage: '字号' }),
          fields: [
            {
              name: 'legend_textStyle_fontSize',
              type: 'fontSizeSelect',
              value: style.legend.textStyle.fontSize
            },
            {

              name: 'legend_textStyle_color',
              type: 'color',
              value: style.legend.textStyle.color
            }
          ]
        },
        {
          name: 'legend_position',
          rel: 'toggle:legend_show',
          label: intl.formatMessage({ id: 'position', defaultMessage: '位置' }),
          type: 'radioGroup',
          props: {
            type: 'position'
          },
          value: 'top'
        }
      ]
    }
  ]
}
