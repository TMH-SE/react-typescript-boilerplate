/* eslint-disable @typescript-eslint/no-var-requires */
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import * as webpack from 'webpack'

import { alias,resolveModule, resolvePath } from './webpack.helper'

require('dotenv').config()

const safePostCssParser = require('postcss-safe-parser')

const config: webpack.Configuration = {
  mode: 'production',
  entry: resolveModule(resolvePath, 'src/index'),
  output: {
    path: resolvePath('dist'),
    pathinfo: false,
    filename: `static/js/[name].[fullhash].bundle.js`,
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    publicPath: '/',
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }]
        }
      })
    ],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  cache: true,
  devtool: false,
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
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
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
    new MiniCssExtractPlugin({
      filename: 'static/css/[id].[fullhash].css',
      chunkFilename: 'static/css/chunk/[chunkhash].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin(
      {
        
        inject: true,
          template: resolvePath('public/index.html'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
      }
    )
  ],
  node: {
    global: false
  },
  performance: {
    hints: false
  }
}

export default config
