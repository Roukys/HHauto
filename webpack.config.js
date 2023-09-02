/* eslint-env node */
const path = require('path')
const webpack = require('webpack')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const BannerBuilder = require('./build/BannerBuilder')

const bannerBuiled = BannerBuilder.buildBanner();

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'HHAuto.user.js',
        path: path.resolve(__dirname, '.'),
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin({
            terserOptions: {
                output: {
                  preamble: bannerBuiled,
                  comments: false
                }
              }
        })],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: bannerBuiled,
            raw: true,
            entryOnly: true
        })
    ]
}
