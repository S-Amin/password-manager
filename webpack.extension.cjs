const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getBasicConfig } = require('./webpack.base.cjs')

module.exports = (env, arg) => {
    const configObj = getBasicConfig(env, arg)
    configObj.entry = {
        main: {
            import: './src/shared/popup.ts',
            filename: 'public/js/main-[contenthash].js',
        },
        content: {
            import: './src/extension/content.ts',
            filename: 'dist/extension/content.js',
        },
        serviceWorker: {
            import: './src/extension/service-worker.ts',
            filename: 'dist/extension/service-worker.js',
        },
    }

    configObj.plugins = [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'pages/password-manager.html',
            template: 'pages/template/password-manager.html',
            cache: true,
        }),
    ]

    return configObj
}
