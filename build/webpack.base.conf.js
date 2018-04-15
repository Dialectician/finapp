const path = require('path')
const paths = require('../config/paths')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.join(__dirname, '../src'),
      '@components': path.join(__dirname, '../src/components'),
      'node_modules': path.join(__dirname, '../node_modules')
    }
  },

  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      include: paths.app
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },

  plugins: [
    new HtmlWebpackIncludeAssetsPlugin({
      assets: { path: 'css', glob: '*.css', globPath: paths.css.output },
      append: true,
      publicPath: '',
      hash: false
    })
  ]
}
