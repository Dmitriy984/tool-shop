const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    'js/script.js': './src/js/index.js', // scripts
    '': './src/css/styles.css' //styles
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]",
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

      //  Loading CSS
      {
        test: /\.(css)$/i,
        use: [
          "style-loader",
          {
            loader: "file-loader",
            options: {
              outputPath: "css",
              name: "[name].[ext]",
            },
          }
          // "css-loader",
          // "postcss-loader",
          // "sass-loader",
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
    // new MiniCssExtractPlugin({
    //   filename: "[name]-[hash:8].css",
    // }),
  ],
};
