const isProduction = (process.env.NODE_ENV === 'production')
const isDevelopment = (process.env.NODE_ENV === 'development')

module.exports = (context) => ({
  parser: context.options.parser,
  map: isDevelopment ? { inline: true } : false,
  plugins: {
    'postcss-import': {
      path: ['src/styles'],
    },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true
      }
    },
    'postcss-reporter': {},
    'postcss-browser-reporter': {},
    'cssnano': isProduction && {
      preset: 'default',
    },
  }
})
