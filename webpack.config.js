/* eslint-env node */
const path = require('path')
const webpack = require('webpack')
const BannerBuilder = require('./build/BannerBuilder')

const bannerBuiled = BannerBuilder.buildBanner();

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: './HHAuto.user.js',
        path: path.resolve(__dirname, '.'),
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          { test: /\.tsx?$/, loader: "ts-loader" },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
    optimization: {
        // The shipped userscript is intentionally NOT minified: userscript
        // platforms and users must be able to read the distributed code,
        // and readable stack traces make user bug reports diagnosable.
        minimize: false,
    },
    performance: {
        hints: false,
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: bannerBuiled,
            raw: true,
            entryOnly: true
        })
    ]
}
