const Koa = require('koa')
const mongoose = require('mongoose')
const { resolve } = require('path')
const views = require('koa-views')
const { connect, initSchemas } = require('./database/init')
const app = new Koa()

;(async () => {
    await connect()

    initSchemas()

    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({})

    console.log(movies)
})()

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