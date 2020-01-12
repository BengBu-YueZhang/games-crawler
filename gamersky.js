const puppeteer = require('puppeteer')

const getGamerskyNews = async (page) => {
    await page.goto('https://www.gamersky.com/')
    const nav = await page.$(`.Mid1Mnav a`)
    const { x, y, width, height } = await nav.boundingBox()
    await page.mouse.move(x + width / 2, y + height / 2)
    return await page.$$eval(`.bgx a`, els => {
        return [...els].map(el => ({ src: el.href, title: el.innerText }))
    })
}

const crawlerStart = async () => {
    let browser = null
    try {
        browser = await puppeteer.launch()
        const page = await browser.newPage()
        const news = await getGamerskyNews(page)
    } catch (error) {  
        console.log(error) 
    } finally {
        if (browser) {
            await browser.close()
        } 
    }  
}

crawlerStart()

module.exports = {    
}
