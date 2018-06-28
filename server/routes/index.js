const Router = require('koa-router')
const Movie = mongoose.model('Movie')
const router = new Router()

router.get('/movies', async (ctx, next) => {
   const movies = await Movie.find({}).sort({
       'meta.createdAt': -1
   })

   ctx.body = {
       movies
   }
})

