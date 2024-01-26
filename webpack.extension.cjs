const { getBasicConfig } = require('./webpack.base.cjs')

module.exports = (env, arg) => ({
    ...getBasicConfig(env, arg),
    entry: {
        'public/js/main': './src/shared/popup.ts',
        'dist/extension/content': './src/extension/content.ts',
        'dist/extension/service-worker': './src/extension/service-worker.ts',
    },
})
