const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/main/js/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'src/main/resources/META-INF.resources/app/app.js')
  },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          exclude: /node_modules/
        },

        {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  'sass-loader'
                ]
    }],
}
}