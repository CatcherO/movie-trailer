const qiniu = require('qiniu')
const nanoid = require('nanoid')
const mongoose = require('mongoose')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const Movie = mongoose.model('Movie')

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}


;(async () => {
  let movies = await Movie.find({
    $or: [
      {videoKey: {$exists: false}},
      {videoKey: null },
      {videoKey: '' }
    ]
  }).exec()
  // let movies = [{
  //   video: 'http://vt1.doubanio.com/201712282244/a97c1e7cd9025478b43ebc222bab892e/view/movie/M/302190491.mp4',
  //   doubanId: '26739551',
  //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2506258944.jpg',
  //   cover: 'https://img1.doubanio.com/img/trailer/medium/2493603388.jpg?'
  // }]
  for(let i = 0; i < movies.length; i++) {
    let movie = movies[i]

    if (movie.video && !movie.video.Key) {

      try {
        console.log('开始传 video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传 cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        console.log('开始传 poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')


        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        console.log(movie)
        // {
        //   video: 'http://vt1.doubanio.com/201712282244/a97c1e7cd9025478b43ebc222bab892e/view/movie/M/302190491.mp4',
        //   doubanId: '26739551',
        //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2506258944.jpg',
        //   cover: 'https://img1.doubanio.com/img/trailer/medium/2493603388.jpg?',
        //   videoKey: 'http://video.iblack7.com/f_Cm_BJ9eBOtM9PROAF58.mp4',
        //   coverKey: 'http://video.iblack7.com/ESImFeEEiW3RpCCsAnr3z.png',
        //   posterKey: 'http://video.iblack7.com/uAzWzcRNDCsDi16UuEWp4.png'
        // }
        await movie.save()
      } catch (err) {
        console.log(err)
      }
    }
  }
})()

