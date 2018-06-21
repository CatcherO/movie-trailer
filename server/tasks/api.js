// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')

async function fetchMovie (item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res

}

;(async () => {
    let movies = [
    {   
        doubanId: 26793852,
        title: '信笺故事',
        rate: 8.3,
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2511250973.jpg' 
    },
    {   
        doubanId: 27066203,
        title: '曼蒂',
        rate: 8.4,
        poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2511683437.jpg' 
    }
    ]

    movies.map( async (movie) => {
        let movieData = await fetchMovie (movie)
        console.log(JSON.parse(movieData).summary)
    })
})()