const path = require('path')
const fs = require('fs')
const schedule = require('node-schedule')
const { promisify } = require('util')
const NewsListModel = require('./model')
const crawlerGamersky = require('./gamersky')
// const crawlerGameSpot = require('./gamespot')
const crawlerIGN = require('./ign')
const crawlerGcores = require('./gcores')
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
    try {
        if (!fs.existsSync(dataDirPath)) {
            await mkdir(dataDirPath)
        } 
    } catch (error) {
        console.log(error)
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
    try {
        console.log('开始爬取')
        const gamersky = await crawlerGamersky()
        // GameSpot一直访问超时，偶尔成功，大部分情况下失败
        // 可能和国内的网络的情况有关？
        // const gameSpot = await crawlerGameSpot()
        const ign = await crawlerIGN()
        // return [...gamersky, ...gameSpot, ...ign] 
        const gcores = await crawlerGcores()
        return [...gamersky, ...ign, ...gcores]
    } catch (error) {
        console.log(error)
    }
}

const writeData = async (data = []) => {
    try {
        const filePath = await existsFile()
        const writeStream = fs.createWriteStream(filePath)
        // jsonp
        writeStream.write(`${JSON.stringify(data)}`)
        writeStream.end()
        writeStream.on('finish', () => {
            console.error('写入已完成')
        }) 
    } catch (error) {
       console.log(error) 
    }
}

// XX:50 (7:40, 20:40, 21:40) run
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
