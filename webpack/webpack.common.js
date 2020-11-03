const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const resourcePath = path.resolve(__dirname, '../src/resources');

module.exports = {
  entry: path.resolve(srcPath, 'index.tsx'),
  // Allows ts(x) and js files to be imported without extension
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: srcPath,
      resources: resourcePath,
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /.svg$/i,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
        options: {
          props: {
            role: 'img',
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: resourcePath, to: 'assets' }],
    }),
  ],
};
