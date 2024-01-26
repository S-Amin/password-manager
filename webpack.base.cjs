const path = require('path')
const fs = require('fs')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)

const getBasicConfig = (env, arg) => ({
    mode: arg.mode,
    devtool: 'inline-source-map',
    output: {
        filename: `[name]${arg.mode === 'production' ? '-[hash]' : ''}.js`,
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: 'tsconfig.frontend.json',
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        extensionAlias: {
            '.js': ['.js', '.ts'],
            '.cjs': ['.cjs', '.cts'],
            '.mjs': ['.mjs', '.mts'],
        },
    },
    resolve: {
        plugins: [PnpWebpackPlugin],
    },
    resolveLoader: {
        plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
})

function getAllFilesConfig(directoryPath, outPutPrefix = '') {
    let config = {}
    const entities = fs.readdirSync(directoryPath)
    entities.forEach((e) => {
        const fullPath = `${directoryPath}/${e}` //path.join(directoryPath, e)
        const stats = fs.statSync(fullPath)
        const newConfig = stats.isDirectory()
            ? getAllFilesConfig(fullPath, outPutPrefix)
            : getTSFilesConfig(fullPath, outPutPrefix)

        config = {
            ...config,
            ...newConfig,
        }
    })

    return config
}

function getTSFilesConfig(pathFile, outPutPrefix) {
    if (path.extname(pathFile) !== '.ts') return {}
    const { dir, name } = path.parse(pathFile)
    const distPath = path
        .join(dir, name)
        .replace(/^src/, '')
        .replace(/^\/|\/$/g, '')
    const trimmedPrefix = outPutPrefix.replace(/^\/|\/$/g, '')
    const finalPath = `${trimmedPrefix}/${distPath}`
    return { [finalPath]: pathFile }
}

// console.log(getAllFilesConfig('./src/extension', 'public/js'))

module.exports = { getBasicConfig, getAllFilesConfig }
