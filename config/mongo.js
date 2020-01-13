const mongoose = require('mongoose')
const db = mongoose.connection
const mode = process.env.mode
const config = {
    develop: {
        mongoUrl: 'mongodb://localhost/gamenews'
    },
    production: {
        mongoUrl: ``
    }
}
const mongoUrl = config[mode].mongoUrl

module.exports = {
    mongoConnect () {
        mongoose.connect(mongoUrl, {
            useNewUrlParser: true
        })
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', () => {
            console.log('mongo已链接')
        })
    }
}
