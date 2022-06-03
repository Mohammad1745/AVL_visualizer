var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: [
        './src/app.js',
        './src/scss/style.scss'
    ],
    output: {
        filename: 'application.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],

}