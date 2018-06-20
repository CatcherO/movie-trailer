const Koa = require('koa')
const { resolve } = require('path')
const views = require('koa-views')
const app = new Koa()

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Luke',
        me: 'Scott'
    }) 
})

app.listen(2333)