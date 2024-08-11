import path from 'path'
import { Configuration } from 'webpack'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const config: Configuration = {
  mode: 'production',
  entry: path.resolve(__dirname, './client/index.tsx'),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
  output: {
    path: path.resolve(__dirname, '../csr-opt'),
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader,"css-loader"],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: 'url-loader'
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      }
    }),
    new MiniCssExtractPlugin(),
  ],
  // 性能有关：assets or entry points超出指定limit时提示
  performance: {
    hints: false
  }
}

export default config