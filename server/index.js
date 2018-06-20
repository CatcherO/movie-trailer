const Koa = require('koa')
const { normalTpl, pugTpl } = require('./tpl')
const app = new Koa()
const pug = require('pug')
app.use(async (ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = pug.render(pugTpl, {
        me: 'Luke',
        you: 'Scott'
    })
})

app.listen(2333)