const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        appcss: './src/main/js/sass/app.scss',
        app: './src/main/js/main.js',
        angularjs: './src/main/js/angularjs.js',
        gentelella: './src/main/js/gentelella.js'
    },
    resolve: {
        preferRelative: true,
        extensions: [".js"]
    },
    output: {
        path: path.resolve(__dirname, 'src/main/resources/META-INF/resources/app/'),
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [

            {
                test: /\.html$/,
                use: [


                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    },


                ]
            },

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
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '/assets/css/',
                            name: '[name].min.css'
                        }
                    },
                    'sass-loader'
                ]
            },

        ],
    },

    optimization: {
        minimize: false
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],

}