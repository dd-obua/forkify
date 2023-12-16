const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const { minify } = require('html-minifier-terser');

module.exports = {
  mode: isProduction ? 'production' : 'development',

  entry: {
    bundle: path.resolve(__dirname, './src/js/controller.js'),
  },

  devtool: isProduction ? false : 'source-map',

  devServer: {
    static: { directory: path.resolve(__dirname, 'dist') },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: isProduction }),
    new HtmlWebpackPlugin({
      title: 'Wepack App',
      filename: 'index.html',
      template: './src/index.html',
      minify: isProduction
        ? {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
          }
        : false,
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],

  optimization: {
    minimizer: isProduction
      ? [
          new OptimizeCssAssetsPlugin(),
          new TerserPlugin(),
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
          }),
        ]
      : [],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    clean: isProduction,
  },
};
