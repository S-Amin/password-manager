const path = require('path')
const fs = require('fs')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)

module.exports = (env, arg) => ({
    mode: arg.mode,
    devtool: 'inline-source-map',
    entry: {
        main: './src/shared/popup.ts',
        // 'components/toast/toast': './src/components/toast/toast.ts',
        ...getAllFilesConfig('./src/components'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/js/'),
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

function getAllFilesConfig(directoryPath) {
    let config = {}
    const entities = fs.readdirSync(directoryPath)
    entities.forEach((e) => {
        const fullPath = `${directoryPath}/${e}` //path.join(directoryPath, e)
        const stats = fs.statSync(fullPath)
        const newConfig = stats.isDirectory()
            ? getAllFilesConfig(fullPath)
            : getTSFilesConfig(fullPath)

        config = {
            ...config,
            ...newConfig,
        }
    })

    return config
}

function getTSFilesConfig(pathFile) {
    if (path.extname(pathFile) !== '.ts') return {}
    const { dir, name } = path.parse(pathFile)
    const distPath = path.join(dir, name).replace('src/', '')
    return { [distPath]: pathFile }
}
