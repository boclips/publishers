const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

const srcPath = path.resolve(__dirname, '../src');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[fullhash:20].js',
    chunkFilename: '[name].[chunkhash:20].chunk.js',
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[fullhash:20].css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({ terserOptions: { sourceMap: true }, parallel: true }),
    ],
  },
});
