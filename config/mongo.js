const mongoose = require('mongoose')
const db = mongoose.connection
const mode = process.env.mode
const config = {
    develop: {
        mongoUrl: 'mongodb://localhost/gamenews'
    },
    production: {
        // https://stackoverflow.com/questions/16124255/how-to-connect-with-username-password-to-mongodb-using-native-node-js-driver
        mongoUrl: `mongodb://game:game@crawlerDb:27017/gamenews`
    }
}
const mongoUrl = config[mode].mongoUrl

// db.createUser(
//     {
//         user: "game",
//         pwd: "game",
//         roles:[
//             {
//                 role: "readWrite",
//                 db: "gamenews"
//             }
//         ]
//     }
// )
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
