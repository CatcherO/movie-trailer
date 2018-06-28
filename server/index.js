const Koa = require('koa')
const mongoose = require('mongoose')
const { resolve } = require('path')
const views = require('koa-views')
const { connect, initSchemas } = require('./database/init')
const app = new Koa()

;(async () => {
    await connect()

    initSchemas()

    // require('./tasks/movie')
    // require('./tasks/api-test')
    require('./tasks/trailer')
    // require('./tasks/qiniu')
})()

// app.use(views(resolve(__dirname, './views'), {
//     extension: 'pug'
// }))

// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         you: 'Luke',
//         me: 'Scott'
//     }) 
// })

// app.listen(2333)