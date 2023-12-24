const path = require('path')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)

module.exports = (env, arg) => ({
    mode: arg.mode,
    devtool: 'inline-source-map',
    entry: {
        main: './src/shared/popup.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/js'),
    },
    // devtool: "source-map",
    // mode: "production",
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
