const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //minimizar css
const TerserPlugin = require('terser-webpack-plugin'); //minimizar js
module.exports = {
  entry: './src/index.js', //nombre dle archivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), //donde se creeara el archivo (dirname == raiz)
    filename: 'main.js', // nombre del archivo compilado de salida
  },
  resolve: {
    extensions: ['.js'], //que archivos va a leer de nuestro proyecto
  },
  module:{
    rules: [
      {
        test: /\.m?js$/,     //añadir cualquier archivo .m js o js 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test:/\.s?css$/,  //reconocer css
        use: [
          MiniCssExtractPlugin.loader ,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html', //de donde va a tomar el template
      filename: './index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: "assets"
        }
      ]
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  },
}
