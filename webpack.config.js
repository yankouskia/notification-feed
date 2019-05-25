const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    sdk: './client/sdk.js',
    app: './client/index.js',
  },
  output: {
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                browsers: ['> 2.5%'],
              }
            }]]
          }
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'template.html'),
      inject: false,
    }),
  ],
  devServer: {
    port: 4000,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
  }
}
