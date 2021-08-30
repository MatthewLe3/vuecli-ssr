const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const server = new Koa()

const resolve = file => path.resolve(__dirname, file)

// 使用客户端的静态资源
server.use(koaStatic(resolve('../dist/client')))

const { createBundleRenderer } = require('vue-server-renderer')

const serverBundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync(
        path.resolve(__dirname, '../src/index.template.html'),
        "utf-8"
    ),
    clientManifest
})

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html)
        })
    })
}


server.use(async (ctx, next) => {
    const context = {
        title: 'hello ssr',
        url: ctx.url
    }

    const html = await renderToString(context)
    ctx.body = html
})



server.listen(3000, () => {
    console.log('3000服务已启动')
})