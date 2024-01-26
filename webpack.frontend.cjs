// const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getBasicConfig, getAllFilesConfig } = require('./webpack.base.cjs')

module.exports = (env, arg) => {
    const baseConfig = getBasicConfig(env, arg)

    // baseConfig.plugins = [
    //     new HtmlWebpackPlugin({
    //         filename: 'public/password-manager.html',
    //         template: 'pages/password-manager.html',
    //     }),
    // ]
    return {
        ...baseConfig,
        entry: {
            'public/js/main': './src/shared/popup.ts',
            ...getAllFilesConfig('./src/components', '/public/js'),
            ...getAllFilesConfig('./src/frontend', '/public/js'),
        },
    }
}
