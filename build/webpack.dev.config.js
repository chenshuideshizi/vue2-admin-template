const { merge } = require('webpack-merge')
const path = require('path')

process.env.NODE_ENV = 'development'

const resolve = p => path.resolve(__dirname, '../', p)

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
      port: 9091,
      open: false,
      compress: true,
      static: {
        publicPath: resolve('dist'),
        directory: resolve('dist')
      },
      hot: true,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          secure: false
        }
      },
      // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
      historyApiFallback: {
          index: '/index.html'
      },
  },
  plugins: [

  ]
})
