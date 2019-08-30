// Important modules this config uses
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackChunkPrefixPlugin = require('html-webpack-chunk-prefix-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const OfflinePlugin = require('offline-plugin')
const { HashedModuleIdsPlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

class HtmlWebpackChunkPrefixPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const SELF = this
    compiler.hooks.compilation.tap(
      'htmlWebpackChunkPrefixPlugin',
      compilation => {
        compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
          'htmlWebpackChunkPrefixPlugin',
          (htmlPluginData, callback) => {
            const { assets } = htmlPluginData
            const js = assets.js.map(item => SELF.options.prefix + item)
            const css = assets.css.map(item => SELF.query.prefix + item)
            assets.js = js
            assets.css = css
            callback()
          },
        )
      },
    )
  }
}

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(process.cwd(), 'dist'),
    chunkFilename: '[name].[chunkhash].chunk.js',
    // TODO create configurable path
    // can't use publicPath due public path will embed into runtime file and no processed by django template engine
    // TODO proccess js with template engine?
    // publicPath: '{{STATIC_URL}}{{DJEDDIT_STATIC_FILES_URL_PREFIX}}',
    publicPath:
      'https://assets.physicsisbeautiful.com/js/npm/@vermus/django-react-djeddit-client/dist/',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1]
            return `npm.${packageName.replace('@', '')}`
          },
        },
      },
    },
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
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
        minifyURLs: true,
      },
      inject: true,
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index_django_embed.html',
      filename: 'react_reddit_django_embed.html',
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
        minifyURLs: true,
      },
      inject: true,
    }),
    // new HtmlWebpackChunkPrefixPlugin({
    //   prefix: '{{STATIC_URL}}{{DJEDDIT_STATIC_FILES_URL_PREFIX}}',
    // }),
    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    // TODO check it
    // new OfflinePlugin({
    //   relativePaths: false,
    //   // publicPath: : '{{STATIC_URL}}{{DJEDDIT_STATIC_FILES_URL_PREFIX}}',
    //   publicPath: '/',
    //   appShell: '/',
    //
    //   // No need to cache .htaccess. See http://mxs.is/googmp,
    //   // this is applied before any match in `caches` section
    //   excludes: ['.htaccess'],
    //
    //   caches: {
    //     main: [':rest:'],
    //
    //     // All chunks marked as `additional`, loaded after main section
    //     // and do not prevent SW to install. Change to `optional` if
    //     // do not want them to be preloaded at all (cached only when first loaded)
    //     additional: ['*.chunk.js'],
    //   },
    //
    //   // Removes warning for about `additional` section usage
    //   safeToUseOptionalCaches: true,
    // }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new WebpackPwaManifest({
      name: 'React Reddit Django',
      short_name: 'React RD',
      description: 'React Django like Reddit forum application',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve('app/images/icon-512x512.png'),
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: path.resolve('app/images/icon-512x512.png'),
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
})
