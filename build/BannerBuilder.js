const fs = require('fs')
const path = require('path')
const pkgJson = require('../package.json')

class BannerBuilder {
    static buildBanner() {
        const metaTemplate = fs.readFileSync(path.resolve(__dirname, './HHAuto.template.js'))
        const meta = metaTemplate.toString()
                .replace('{{version}}', pkgJson.version)
        return meta;
    }
}

module.exports = BannerBuilder
