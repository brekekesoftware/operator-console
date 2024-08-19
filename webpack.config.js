const path = require("path");
const webpack = require("webpack");

const WebpackNotifierPlugin = require('webpack-notifier');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { ESBuildMinifyPlugin } = require('esbuild-loader')

const svgToMiniDataURI = require('mini-svg-data-uri');

/**
 * @typedef {import('webpack').Configuration} Configuration
 * @typedef {import('webpack').RuleSetRule} RuleSetRule
 */

/**
 * @type {RuleSetRule[]}
 */
const baseModuleRules = [
  {
    test: /\.s[ac]ss$/i,
    loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    // options: {
    //   modules: {
    //     auto: true,
    //   },
    // },
  },
  {
    test: /\.less$/,
    use: [{
      loader: MiniCssExtractPlugin.loader,
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'less-loader', // compiles Less to CSS
      options: {
        lessOptions: {
          modifyVars: {
            'font-family': 'WorkSans, Meiryo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            'text-color': '#212121',
            'text-color-secondary': '#757575',
            'border-color-base': '#e0e0e0',
            'border-color-split': '#e0e0e0',
            'primary-color': '#212121',
            'input-hover-border-color': '#4cc5de',
            'primary-color-hover': '#4cc5de',
            'primary-color-active': '#4cc5de',
            'primary-color-outline': '#4cc5de',
            'primary-1': '#eeeeee',
            'primary-2': '#eeeeee',
            'primary-3': '#eeeeee',
            'primary-4': '#eeeeee',
            'primary-5': '#4cc5de',
            'primary-6': '#212121',
            'primary-7': '#212121',
            'segmented-bg': '#ffffff',
            'segmented-selected-bg': '#212121',
            'segmented-label-hover-color': '#eeeeee',
            'animation-duration-slow': '0.1s',
            'animation-duration-base': '0.1s',
            'success-color': '#74bf53',
            'info-color': '#4cc5de',
            'error-color': '#FF4526',
          },
          javascriptEnabled: true,
        },
      },
    }],
  },
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
  {
    test: /\.tsx?|\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    use: [{
      loader: "esbuild-loader",
      options: {
        loader: 'tsx',
        target: 'es2015',
      },
    }],
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "url-loader",
        options: {
          generator: (content) => svgToMiniDataURI(content.toString()),
        },
      },
    ],
  },
  {
    test: /\.(png|jpg|gif|ttf|otf|eot|woff|woff2)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          context: "src",
        },
      },
    ],
  },
];

/**
 * @type {Configuration[]}
 */
const modules = (env, argv) => ({
  entry: {
    "operator-console": path.resolve(__dirname, "src", "index.jsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    library: ['Brekeke'],
    libraryTarget: 'window',
  },
  //devtool: argv.mode === 'production' ? false : "#cheap-eval-source-map",
  devtool: argv.mode === 'production' ? false : "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["src", "node_modules"],
    // alias: {
    //   'styled-components/macro': 'styled-components/dist/styled-components.browser.esm.js',
    // },
  },
  watchOptions: {
    aggregateTimeout: 2000,
    ignored: ['**/dist', '**/node_modules'],
  },
  parallelism: 4,
  cache: {
    type: 'filesystem',
    buildDependencies: {
      sources: [path.resolve(process.cwd(), 'src') + '/'],
      tsConfig: [path.resolve(process.cwd(), 'tsconfig.json')],
      config: [__filename],
      timestamp: true
    },
  },
  module: {
    rules: baseModuleRules,
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 102400000,
    maxAssetSize: 102400000
  },
  optimization: {
    // this causes "Minified React error"
    // minimize: argv.mode === 'production',
    minimize: false,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
      new CssMinimizerPlugin(),
    ]
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'ca2_vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
  plugins: [
    new WebpackNotifierPlugin({alwaysNotify: true, excludeWarnings: true}),
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}),
  ],
  externals: {
    moment: 'moment'
  }
});

module.exports = modules;
