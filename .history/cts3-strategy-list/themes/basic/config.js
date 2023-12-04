export default function (themeType, SHOWUTILS) {
  const { intl } = SHOWUTILS

  return [
    {
      title: intl.formatMessage({ id: 'title', defaultMessage: '标题' }),
      type: 'title',
      fields: [
        {
          name: 'series_type',
          label: intl.formatMessage({
            id: 'cts strategy list title type',
            defaultMessage: '标题类别'
          }),
          type: 'input',
          value: '收集'
        },
        {
          name: 'series_text',
          label: intl.formatMessage({
            id: 'cts strategy list title text',
            defaultMessage: '标题文字'
          }),
          type: 'input',
          value: '默认标题'
        }
      ]
    },
    {
      title: intl.formatMessage({ id: 'list', defaultMessage: '列表' }),
      type: 'list',
      fields: [
        {
          name: 'series_listLabel',
          label: intl.formatMessage({
            id: 'cts strategy list item label',
            defaultMessage: '列表项名称'
          }),
          type: 'input',
          value: "['fps','雷达']"
        },
        {
          name: 'series_listValue1',
          label: intl.formatMessage({
            id: 'cts strategy list item value1',
            defaultMessage: '列表项值1'
          }),
          type: 'input',
          value: "['100','100']"
        },
        {
          name: 'series_listValue2',
          label: intl.formatMessage({
            id: 'cts strategy list item value2',
            defaultMessage: '列表项值2'
          }),
          type: 'input',
          value: ''
        }
      ]
    }
  ]
}
