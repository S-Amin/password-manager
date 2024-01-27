const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getBasicConfig, getAllFilesConfig } = require('./webpack.base.cjs')

module.exports = (env, arg) => {
    const isHashed = arg.mode === 'production' ? '-[contenthash]' : ''
    const configObj = getBasicConfig(env, arg)

    configObj.entry = {
        main: {
            import: './src/shared/popup.ts',
            filename: `public/js/main${isHashed}.js`,
        },
        home: {
            import: './src/frontend/home.ts',
            filename: `public/js/frontend/home${isHashed}.js`,
        },
    }
    configObj.plugins = [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'pages/password-manager.html',
            template: 'pages/template/password-manager.html',
            cache: true,
        }),
        new HtmlWebpackPlugin({
            chunks: ['home'],
            filename: 'pages/home.html',
            template: 'pages/template/home.html',
            cache: true,
        }),
    ]

    return configObj
}
