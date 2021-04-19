// const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: [path.resolve('./src/js/index.js'),
  './src/scss/main.scss'],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          // For webpack@4
          // test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      //  Loading images
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name]-[sha1:hash:7].[ext]",
            },
          },
        ],
      },
      //  Loading fonts
      {
        test: /\.(ttf|otf|eot|woof|woof2)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
              name: "[name].[ext]",
            },
          },
        ],
      },
      //  Loading JS/JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      //  Loading SASS/SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/cart.html",
      filename: "cart.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/orders.html",
      filename: "orders.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/order-details.html",
      filename: "order-details.html",
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name]-[hash:8].css",
      chunkFilename: "[id].css",
    }),
  ],
};
