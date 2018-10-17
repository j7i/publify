require('now-env')
const path = require('path')
const webpack = require('webpack')
const { withPlugins } = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const babel = JSON.parse(require('fs').readFileSync('.babelrc', 'utf8'))
const { PHASE_PRODUCTION_BUILD } = require('next/constants')

const nextConfig = {
  webpack(config, { isServer, dev, ...options }) {
    if (!isServer) {
      config.externals.push('fs')

      if (dev) {
        // show ts errors while running project
        config.plugins.push(new ForkTsCheckerWebpackPlugin())
      }
    }

    if (!dev) {
      // Add polyfills (for _all_ browsers) to main entrypoint.
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        if (entries['main.js']) {
          entries['main.js'].unshift('./lib/@helpers/polyfills/index.js')
        }
        return entries
      }
    }

    // get aliases from .babelrc
    babel.plugins &&
      babel.plugins.forEach(plugin => {
        if (plugin[0] === 'module-resolver') {
          const options = plugin[1]

          for (const key of Object.keys(options.alias)) {
            config.resolve.alias[key] = path.resolve(__dirname, options.alias[key])
          }
        }
      })

    return config
  }
}

module.exports = withPlugins(
  [
    withTypescript,
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[local]--[hash:base64:5]'
        },
        [PHASE_PRODUCTION_BUILD]: {
          cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[hash:base64:4]'
          }
        }
      }
    ]
  ],
  nextConfig
)
