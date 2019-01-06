const path = require('path')
const conditionals = require('postcss-conditionals')
const cssNext = require('postcss-cssnext')
const forLoop = require('postcss-for')
const functions = require('postcss-functions')
const atImport = require('postcss-import')
const cssNested = require('postcss-nested')
const postCssReporter = require('postcss-reporter')
const vars = require('postcss-simple-vars')
const variables = require('./lib/@postcss/variables')
const lost = require('lost')
const cssnano = require('cssnano')
const IS_DEV = process.env.NODE_ENV !== 'production'

const plugins = [
  conditionals(),
  cssNext({
    // Allow future CSS features to be used, also auto-prefixes the CSS...
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'] // ...based on this browser list
  }),
  forLoop(),
  functions({
    glob: path.join(process.cwd(), 'lib', '@postcss', 'functions', '*.js')
  }),
  atImport(),
  cssNested(),
  postCssReporter({
    // Posts messages from plugins to the terminal
    clearMessages: true
  }),
  vars({
    variables: () => variables
  }),
  lost()
]

if (!IS_DEV) {
  plugins.push(cssnano())
}

module.exports = {
  plugins
}
