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
          '@communication': './components/@communication',
          '@config': './lib/@config',
          '@core': './components/@core',
          '@helpers': './lib/@helpers',
          '@layout': './components/@layout',
          '@postcss': './lib/@postcss',
          '@user': './components/@user'
        }
      }
    ],
    ['transform-define', env]
  ]
}
