const puppeteer = require('puppeteer')

const getGamerskyNews = async (page) => {
    try {
        await page.goto('https://www.gamersky.com/')
        const nav = await page.$(`.Mid1Mnav a`)
        const { x, y, width, height } = await nav.boundingBox()
        await page.mouse.move(x + width / 2, y + height / 2)
        return await page.$$eval(`.bgx a`, els => {
            return [...els].map(el => ({ src: el.href, title: el.innerText, source: 'Gamersky' }))
        })
    } catch (error) {
        return []
    }
}

const crawlerGamersky = async () => {
    let browser = null
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        const page = await browser.newPage()
        return await getGamerskyNews(page)
    } catch (error) {  
        console.log(error) 
    } finally {
        if (browser) {
            await browser.close()
        } 
    }  
}

module.exports = crawlerGamersky
