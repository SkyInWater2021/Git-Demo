module.exports = {
  root: true,
  globals: {
    $: true,
    CHART_PLUGIN: true
  },
  extends: ['@uyun/eslint-config-standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': 'off',
    'react/jsx-no-bind': 0,
    'no-mixed-operators': 0,
    'react/no-unused-prop-types': 0,
    'no-useless-escape': 0,
    'no-eval': 0,
    'no-prototype-builtins': 0,
    'space-before-function-paren': 0
  }
}
