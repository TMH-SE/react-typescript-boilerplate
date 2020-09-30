/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
import * as webpack from 'webpack'
import * as path from 'path'
import * as fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const safePostCssParser = require('postcss-safe-parser')

const appDirectory = fs.realpathSync(process.cwd())
const resolvePath = (relativePath: string): string =>
  path.resolve(appDirectory, relativePath)

const moduleFileExtensions = ['ts', 'tsx']
const resolveModule = (
  resolveFn: (arg: string) => string,
  filePath: string
): string => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

const developmentMode = process.env.NODE_ENV === 'development'

const productionMode = process.env.NODE_ENV === 'production'

const PORT = parseInt(process.env.PORT) || 8000

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
  },
  productionMode && 'cache-loader'
].filter(Boolean)

const config: webpack.Configuration = {
  mode: productionMode
    ? 'production'
    : developmentMode
    ? 'development'
    : 'none',
  entry: resolveModule(resolvePath, 'src/index'),
  output: {
    path: resolvePath('dist'),
    pathinfo: developmentMode,
    filename: `static/js/[name].[hash].bundle.js`,
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    publicPath: '/',
    globalObject: 'this'
  },
  optimization: {
    minimize: productionMode,
    minimizer: [
      new TerserPlugin({
        cache: true,
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
    moduleIds: 'hashed',
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
  watch: developmentMode,
  watchOptions: {
    poll: 1000
  },
  cache: true,
  devtool: developmentMode ? 'cheap-module-eval-source-map' : false,
  resolve: {
    modules: [resolvePath('src'), resolvePath('node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@app': resolvePath('src/app'),
      '@assets': resolvePath('src/assets'),
      '@images': resolvePath('src/assets/images'),
      '@fonts': resolvePath('src/assets/fonts'),
      '@components': resolvePath('src/components'),
      '@constants': resolvePath('src/constants'),
      '@layouts': resolvePath('src/layouts'),
      '@pages': resolvePath('src/pages'),
      '@routers': resolvePath('src/routers'),
      '@tools': resolvePath('src/tools'),
      '@utils': resolvePath('src/utils'),
      '@shared': resolvePath('src/shared')
    },
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
            '@babel/preset-react',
            '@babel/preset-typescript',
            '@babel/preset-env'
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime',
            'react-hot-loader/babel'
          ]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ...performanceLoaders,
          productionMode && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: developmentMode,
              reloadAll: true
            }
          },
          developmentMode && 'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')]
            }
          }
        ].filter(Boolean)
      },
      {
        test: /\.less$/,
        use: [
          ...performanceLoaders,
          productionMode && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: developmentMode,
              reloadAll: true
            }
          },
          developmentMode && 'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ].filter(Boolean)
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
              name: '[hash].[ext]'
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
              name: '[hash].[ext]'
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
      async: developmentMode,
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[id].[hash].css',
      chunkFilename: 'static/css/chunk/[chunkhash].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: resolvePath('public/index.html')
        },
        productionMode
          ? {
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
          : undefined
      )
    )
  ].filter(Boolean),
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    contentBase: resolvePath('dist'),
    watchContentBase: true,
    host: '0.0.0.0',
    port: PORT,
    hot: true,
    hotOnly: true,
    compress: true,
    clientLogLevel: 'silent',
    noInfo: true,
    disableHostCheck: true,
    useLocalIp: true,
    open: true
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false
  }
}

export default config
