const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const crawlerGamersky = require('./gamersky')
const crawlerGameSpot = require('./gamespot')
const crawlerIGN = require('./ign')
const schedule = require('node-schedule')
const mode = process.env.mode
const dataPath = mode === 'develop' ? path.resolve(__dirname, './data') : '/var/www/crawlerData'

const asyncMkdir = promisify(fs.mkdir)

const existsDir = async () => {
    if (!fs.existsSync(dataPath)) {
        await asyncMkdir(dataPath)
    }
}

const crawler = async () => {
    const [a, b, c] = await Promise.all([
        crawlerGamersky(),
        crawlerGameSpot(),
        crawlerIGN()
    ])
    const news = [...a, ...b, ...c]
}

const writeData = () => {
}

schedule.scheduleJob('50 * * * *', async () => {
    try {
        await existsDir()
        await crawler()
        writeData()
    } catch (error) {
        console.log(error)
    }
})
