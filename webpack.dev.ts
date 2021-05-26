/* eslint-disable @typescript-eslint/no-var-requires */
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { alias, resolveModule, resolvePath } from './webpack.helper'

import 'webpack'

require('dotenv').config()

const PORT = parseInt(process.env.PORT, 10) || 8000

const performanceLoaders = [
  {
    loader: 'thread-loader',
    options: {
      workers: 2,
      workerParallelJobs: 50,
      workerNodeArgs: ['--max-old-space-size=1024'],
      poolRespawn: false,
      poolTimeout: 2000,
      poolParallelJobs: 50
    }
  }
]

const config = {
  mode: 'development',
  entry: resolveModule(resolvePath, 'src/index'),
  output: {
    path: resolvePath('dist'),
    pathinfo: true,
    filename: `static/js/[name].[fullhash].bundle.js`,
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    publicPath: '/',
    globalObject: 'this'
  },
  watchOptions: {
    poll: 1000
  },
  cache: true,
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    modules: [resolvePath('src'), resolvePath('node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias,
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: resolvePath('src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic'
              }
            ],
            '@babel/preset-typescript',
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current'
                }
              }
            ]
          ],
          plugins: ['@babel/plugin-transform-runtime', 'react-hot-loader/babel']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ...performanceLoaders,
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: ['autoprefixer']
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          ...performanceLoaders,
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: ['autoprefixer']
              }
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: resolvePath('src/assets/images'),
        use: [
          ...performanceLoaders,
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/assets/images',
              name: '[fullhash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: resolvePath('src/assets/fonts'),
        use: [
          ...performanceLoaders,
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/assets/fonts',
              name: '[fullhash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          ...performanceLoaders,
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolvePath('public/index.html')
    })
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    contentBase: resolvePath('dist'),
    watchContentBase: true,
    host: 'localhost',
    port: PORT,
    hot: true,
    hotOnly: true,
    compress: true,
    clientLogLevel: 'silent',
    noInfo: true,
    disableHostCheck: true,
    useLocalIp: false,
    open: true
  },
  performance: {
    hints: false
  }
}

export default config
