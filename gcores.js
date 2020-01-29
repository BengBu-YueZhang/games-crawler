const puppeteer = require('puppeteer')

const getGcoresNews = async (page) => {
    try {
        console.log(`机核网 开始`)
        await page.goto('https://www.gcores.com/game')
        console.log(`机核网 完成`)
        const newss = await page.$$eval(`.original.am_card.original-normal.original-article .am_card_content.original_content`, els => {
            return els.map(el => ({ src: el.href, source: 'Gcores' }))
        })
        const titles = await page.$$eval(`.original.am_card.original-normal.original-article .am_card_content.original_content h3`, els => {
            return els.map(el => ({ title: el.title }))
        })
        return newss.map((news, i) => {
            return {...news, ...titles[i]}
        })
    } catch (error) {
        return []
    }
}

const crawlerGcores = async () => {
    let browser = null
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        const page = await browser.newPage()
        return await getGcoresNews(page)
    } catch (error) {  
        console.log(error) 
    } finally {
        if (browser) {
            await browser.close()
        } 
    }  
}

module.exports = crawlerGcores
