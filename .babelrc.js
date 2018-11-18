const env = require('./lib/@config/environment/variables.js')

module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        cwd: 'babelrc',
        alias: {
          '@advert': './components/@advert',
          '@auth': './components/@auth',
          '@user': './components/@user',
          '@core': './components/@core',
          '@layout': './components/@layout',
          '@locations': './components/@locations',
          '@helpers': './lib/@helpers',
          '@config': './lib/@config',
          '@postcss': './lib/@postcss'
        }
      }
    ],
    ['transform-define', env]
  ]
}
