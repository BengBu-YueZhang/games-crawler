const path = require('path')
const fs = require('fs')
const schedule = require('node-schedule')
const { promisify } = require('util')
const NewsListModel = require('./model')
const crawlerGamersky = require('./gamersky')
const crawlerGameSpot = require('./gamespot')
const crawlerIGN = require('./ign')
const { mongoConnect } = require('./config/mongo')

const mode = process.env.mode
let dataDirPath = mode === 'develop' ? path.resolve(__dirname, './data') : '/var/www/crawlerData'
const mkdir = promisify(fs.mkdir)

const saveNewsList = async (data = []) => {
    try {
        const newsList = new NewsListModel({
            list: data
        })
        await newsList.save()
    } catch (error) {
        console.log(error)
    }
}

const existsDir = async () => {
    if (!fs.existsSync(dataDirPath)) {
        await mkdir(dataDirPath)
    }
}

const existsFile = async () => {
    const date = new Date()
    const filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}.js`
    const filePath = path.join(dataDirPath, filename)
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '')
    }
    return filePath
}

const crawler = async () => {
    const [a, b, c] = await Promise.all([
        crawlerGamersky(),
        crawlerGameSpot(),
        crawlerIGN()
    ])
    return [...a, ...b, ...c]
}

const writeData = async (data = []) => {
    const filePath = await existsFile()
    const writeStream = fs.createWriteStream(filePath)
    // jsonp
    writeStream.write(`handleNewsList(${JSON.stringify(data)})`)
    writeStream.end()
    writeStream.on('finish', () => {
        console.error('写入已完成')
    })
}

// XX:50 (7:50, 20:50, 21:50) run
schedule.scheduleJob('50 * * * *', async () => {
    try {
        await existsDir()
        const news = await crawler()
        await saveNewsList(news)
        writeData(news)
    } catch (error) {
        console.log(error)
    }
})

mongoConnect()
