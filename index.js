const NewsList = require('./models')
const crawlerGamersky = require('./gamersky')
const crawlerGameSpot = require('./gamespot')
const crawlerIGN = require('./ign')
const schedule = require('node-schedule')

const start = async () => {
    const [a, b, c] = await Promise.all([
        crawlerGamersky(),
        crawlerGameSpot(),
        crawlerIGN()
    ])
    const news = [...a, ...b, ...c]
}

// schedule.scheduleJob('54 * * * *', start)
// start()