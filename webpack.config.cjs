const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './Webpack/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist_webpack'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // 配置loader：文件转换器
  module: {
    rules: [
      {
        // 匹配文件：以 .ts 结尾的文件
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // 匹配文件：以 .css 结尾的文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  // 插件
  plugins: [
    // 自动生成index.html文件
    new HtmlWebpackPlugin({
      template: './Webpack/index.html',
    }),
  ],
  // 仅生产环境压缩
  optimization: {
    minimize: isProd,
    ...(isProd && { minimizer: [new TerserPlugin()] }),
  },
  // 配置服务器
  devServer: {
    port: 3000,
    open: true
  }
};
