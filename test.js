// console.log(Date.now())
// console.log(new Date(2018))
// ;(async () => {
//     console.log(ko)
// })()
// function sub_curry(fn){
//     return function(){
//         return fn()
//     }
// }

// function curry(fn, length){
//     length = length || 4;
//     return function(){
//         if (length > 1) {
//             return curry(sub_curry(fn), --length)
//         }
//         else {
//             return fn()
//         }
//     }
// }

// var fn0 = function(){
//     console.log(1)
// }
const puppeteer = require('puppeteer')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})
;(async () => {
    console.log('Start visit the target page')

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })

    const page = await browser.newPage()
    await page.goto('https://movie.douban.com/subject/1297359/', {
        waitUntil: 'networkidle2'
    })
  
    await sleep(1000)

    console.log('ok')
    const result = await page.evaluate(() => {
        var $ = window.$
        var it = $('.related-pic-video')
    //     if (it) {
    //         var s = 'url("https://img3.doubanio.com/img/trailer/medium/2025134934.jpg?")'
    //         var link = it.attr('href')
    //         var cover = s.match(/http.+jpg/)[0]

    //         return {
    //             link,
    //             cover
    //         }
    //     }
    //     return {}
        return $ 
    })

    console.log(result)
})()