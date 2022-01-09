const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { resolve } = require('./utils')
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== "production"
let context = resolve('src')

module.exports = {
  cache: {
    type: "filesystem", // 使用文件系统缓存
  },
  performance: { // 打包性能优化提示
    maxAssetSize: 100000000,
    maxEntrypointSize: 400000000
  },
  context: resolve(''), // 基础目录，绝对路径，用于从配置中解析入口点(entry point)和 加载器(loader)。
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: devMode ? 'static/js/[name].js' : 'static/js/[name].[contenthash:8].js',
    path: resolve('dist'),
    publicPath: '/',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  devtool: devMode ? 'source-map' : false,
  resolve: {
    symlinks: false,
    extensions: ['.js', '.vue'],  
    alias: {
      '@': resolve('src')
    },
    modules: [
      resolve( './node_modules'),
      'node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex)$/,
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: true
              },
              cacheDirectory: resolve('node_modules/.cache/vue-loader')
            }
          }
        ]
      },
      { // js 文件
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 2
            }
          }
        ]
      },
      { // 加载图片
        test: /\.(png|svg|jpg|jpeg|gif)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
					filename: 'static/images/[name].[hash][ext][query]'
				}
      }, 
      { // 加载 css
        test: /\.css$/,
        oneOf: [
          {
            use: [
              devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      { // 加载 css
        test: /\.s(a|c)ss$/,
        oneOf: [
          {
            use: [
              devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },

      { // 加载字体
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
					filename: 'static/fonts/[name].[hash][ext][query]'
				}
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: ''
    }),
    new NodePolyfillPlugin(),  // Polyfill Node.js core modules in Webpack. This module is only needed for webpack 5+.
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(), // 强制所有所需模块的整个路径与磁盘上的实际路径完全匹配
    new HtmlWebpackPlugin({ // 在生产环境会启用压缩
      template: resolve('/public/index.html'),
      inject: 'body'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist'),
          toType: 'dir',
          globOptions: {
            ignore: [
              '.DS_Store',
              '**/index.html'
            ]
          }
        }
      ]
    })
  ],
  optimization: {
    // sideEffects: false,
    minimizer: [
      new CssMinimizerPlugin() // webpack@5 仅在生产环境开启 CSS 优化
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        elementUI: {
          name: 'chunk-elementUI',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('components'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single'
  }
}
