const puppeteer = require('puppeteer')

const getGameSpotNews = async (page) => {
    try {
        console.log(`gamespot 开始`)
        await page.goto('https://www.gamespot.com/', {
            timeout: 45000
        })
        const popular = await page.$(`#river > dl > dd > div > a.pod-header__filters-item.js-filter-option`)
        await popular.click()
        const as = await page.$$eval(`#river > div > section a`, els => {
            return [...els].map(el => el.href)
        })
        const ts = await page.$$eval(`#river > div > section a div h3`, els => {
            return [...els].map(el => el.innerText)
        })
        console.log(`gamespot 完成`)
        return as.map((h, i) => ({ src: h, title: ts[i], source: 'GameSpot' }))
    } catch (error) {
        return []
    }
    
}

const crawlerGameSpot = async () => {
    let browser = null
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        const page = await browser.newPage()
        return await getGameSpotNews(page)
    } catch (error) {  
        console.log(error) 
    } finally {
        if (browser) {
            await browser.close()
        } 
    }
}

module.exports = crawlerGameSpot
