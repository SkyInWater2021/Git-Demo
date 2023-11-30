let config
if (process.env.NODE_ENV === 'development') {
  config = require('@uyun/ushow/everest.config.plugin.dev')
} else {
  config = require('@uyun/ushow/everest.config.plugin.build')
}
module.exports = config
