const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');

module.exports = merge(common, {
  entry: path.resolve(srcPath, 'index-fake.tsx'),
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    // chunkFilename: '[name].chunk.js',
  },
  devServer: {
    contentBase: distPath,
    historyApiFallback: true,
    port: 9000,
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css', ignoreOrder: true }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'silent-check-sso.html',
      template: path.resolve(srcPath, 'silent-check-sso.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcPath, 'index-fake.html'),
    }),
  ],
});
