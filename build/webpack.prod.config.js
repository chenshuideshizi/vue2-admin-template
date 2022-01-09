const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

process.env.NODE_ENV = 'production'

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig,{
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css',
        ignoreOrder: true
      }
    )
    // new OptimizeCssnanoPlugin({
    //     sourceMap: false,
    //     cssnanoOptions: {
    //       preset: [
    //         'default',
    //         {
    //           mergeLonghand: false,
    //           cssDeclarationSorter: false
    //         }
    //       ]
    //     }
    // })
  ]
})


