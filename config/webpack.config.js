const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

const {
  when,
  whenDev,
  whenProd,
  resolveApp,
  paths,
  mode,
  isEnvProduction,
  isEnvDevelopment,
  port,
  proxy,
  outputPublicPath,
  externals,
} = require('./env');

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    ...whenDev(['style-loader']),
    ...whenProd([
      {
        loader: MiniCssExtractPlugin.loader
      }
    ]),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })
        ],
        sourceMap: isEnvDevelopment
      }
    },
    ...when(!!preProcessor, [
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': '#1DA57A'
            }
          }
        }
      },
      {
        loader: 'style-resources-loader',
        options: {
          patterns: resolveApp('src/assets/less/variables/theme.less'),
          injector: 'append'
        }
      }
    ])
  ];
  return loaders;
};

module.exports = {
  // 入口文件
  mode,

  bail: isEnvProduction,
  devtool: isEnvProduction ? false : isEnvDevelopment && 'cheap-module-source-map',
  entry: paths.appIndexJs,
  output: {
    publicPath: outputPublicPath,
    pathinfo: isEnvDevelopment,
    path: isEnvProduction ? paths.appBuild : undefined,
    filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : '[name].js',
    chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].chunk.js' : '[name].chunk.js'
  },

  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        parallel: true, //使用多进程并行运行来提高构建速度
        terserOptions: {
          compress: {
            comparisons: false,
            drop_console: true
          },
          output: {
            // Turned on because emoji and regex is not minified properly using default
            ascii_only: true, //
            comments: false // 去掉注释
          },
          mangle: {
            safari10: true
          }
        },
        extractComments: false, // 不提取注释，默认true
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },

  resolve: {
    // .js非src文件使用
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        // tsconfig文件
        configFile: paths.appTsConfig
      })
    ]
  },
  ...whenProd([{
    externals,
  }])[0],

  devServer: {
    open: true,
    host: "0.0.0.0", // 本机ip
    port,
    // port: 443,
    // https: true,
    useLocalIp: true,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    proxy,
  },
  stats: 'errors-only',
  // TODO package中的browserslist会使热加载失效，开发指定为web
  // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/235
  target: isEnvProduction ? "browserslist" : "web",

  plugins: [
    new ProgressBarPlugin({}),
    new webpack.NoEmitOnErrorsPlugin(),
    ...whenDev([new FriendlyErrorsWebpackPlugin(), new ReactRefreshWebpackPlugin()]),
    ...whenProd([new CleanWebpackPlugin({})]),
    new HtmlWebpackPlugin({
      title: "我的App",
      template: paths.appHtml,
      inject: true,
      ...whenProd([{
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
      }])[0],
      isEnvProduction,
    }),
    //  src里里使用process.env.API_ENV
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
    }),
    ...whenProd([
      new MiniCssExtractPlugin({
        filename: 'static/css/[name][contenthash:8].css'
      })
    ]),
    // 忽略moment的本地化文件，入口引入
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ForkTsCheckerWebpackPlugin({
      async: isEnvDevelopment
    }),
    ...whenDev([
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        // ESLint class options
        baseConfig: require(resolveApp('.eslintrc.js')),
      }),]),
    ...when(isEnvProduction && process.env.ANALYZE, [new BundleAnalyzerPlugin()])
  ],
  module: {
    rules: [
      {
        oneOf: [
          // tsx?文件
          {
            test: /\.[jt]sx?$/,
            include: paths.appSrc,
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic' // babel7自动import React
                  }
                ],
                [
                  '@babel/preset-typescript',
                  {
                    onlyRemoveTypeImports: true
                  }
                ]
              ],

              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                [
                  '@babel/plugin-transform-runtime',
                  {
                    useESModules: true,
                    corejs: { version: 3, proposals: true }
                  }
                ],
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  }
                ],
                ...whenDev(['react-refresh/babel'])
              ],
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,
              compact: isEnvProduction
            }
          },
          // 图片文件
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10 * 1024,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          // 字体文件
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            use: {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          },
          // css
          {
            test: /\.css$/,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvDevelopment,
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            })
          },
          // global里的less不走模块化
          {
            test: /\.global.less$/,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvDevelopment,
                modules: false
              },
              'less-loader'
            )
          },
          // 普通less
          {
            test: /\.less$/,
            exclude: [/node_modules|antd/],
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvDevelopment,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              'less-loader'
            )
          },
          // antd里的less不走模块化
          {
            test: /\.less$/,
            include: [/antd/],
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvDevelopment,
                modules: false
              },
              'less-loader'
            )
          },

          // 其他文件
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
          // stop 已经使用里oneOf,file-loader之后不再使用任何loader
        ]
      }
    ]
  }
};
