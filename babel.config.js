module.exports = {
  presets: ['@uyun/babel-preset-everest'],
  plugins: [
    [
      'import',
      {
        libraryName: '@uyun/components'
      },
      '@uyun/components'
    ]
  ]
}
