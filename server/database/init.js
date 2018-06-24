const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1/douban-test'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise
const initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
const connect = () => {
    let MaxConnectTimes = 0

    return new Promise((resolve, reject) => {
   if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true)
    }
    mongoose.connect(db)

    mongoose.connection.on('disconnected', () =>  {
        MaxConnectTimes++
        if (MaxConnectTimes < 5) {
            mongoose.connect(db)
        } else {
            throw new Error('数据库挂了')
        }
    })

    mongoose.connection.on('error', err => {
         MaxConnectTimes++
        if (MaxConnectTimes < 5) {
            mongoose.connect(db)
        } else {
            throw new Error('数据库挂了')
        }       
    })

    mongoose.connection.once('open', () => {
    //    const Dog = mongoose.model('Dog', { name: String})
    //    const doga = new Dog({ name: '阿尔法'})
       
    //    doga.save().then(() => {
    //        console.log('wang')
    //    })
        resolve()
        console.log('MongDB Connected successfully!')
        })
    }) 
}
module.exports = {
    initSchemas,
    connect
}