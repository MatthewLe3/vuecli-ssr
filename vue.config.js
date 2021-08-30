const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')

const env = process.env
const isServer = env.RUN_ENV === "server"

module.exports = {
    lintOnSave: false,
    publicPath: './',
    outputDir: `dist/${env.RUN_ENV}`,
    configureWebpack: {
        // 根据指令，制定入口文件
        entry: `./src/entry-${env.RUN_ENV}.js`,
        // 打包后不生成sourcemap
        devtool: 'eval',
        //在类 Node.js 环境编译代码
        // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
        // 并且还会在编译 Vue 组件时，
        // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
        // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
        target: isServer ? "node" : "web",
        output: {
            // 入口起点的返回值将使用 output.library 中定义的值，分配给 exports 对象。这个名称也意味着，模块用于 CommonJS 环境
            libraryTarget: isServer ? "commonjs2" : undefined,
        },
        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // 外置化应用程序依赖模块。可以使服务器构建速度更快，
        // 并生成较小的 bundle 文件。
        externals: isServer ? nodeExternals({
            allowlist: /\.css$/,
        }) : undefined,
        optimization: {
            splitChunks: isServer ? false : undefined
        },
        // 这是将服务器的整个输出
        // 构建为单个 JSON 文件的插件。
        // 服务端默认文件名为 `vue-ssr-server-bundle.json`
        // 客户端默认文件名为 `vue-ssr-client-manifest.json`
        plugins: [
            isServer ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
        ]
    }
}