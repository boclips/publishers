const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
  },
  entry: path.resolve(srcPath, 'index.tsx'),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  // Allows ts(x) and js files to be imported without extension
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: path.resolve(__dirname, './src'),
      resources: path.resolve(__dirname, './src/resources'),
    },
  },
  module: {
    rules: [
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
    new MiniCssExtractPlugin({ filename: '[name].[chunkhash].css' }),
    new HtmlWebpackPlugin({ template: path.resolve(srcPath, 'index.html') }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/resources', to: 'assets' }],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
