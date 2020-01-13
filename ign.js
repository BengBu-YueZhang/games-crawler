const puppeteer = require('puppeteer')

const getIGNNews = async (page) => {
    try {
        await page.goto('http://www.ign.xn--fiqs8s/')
        return await page.$$eval(`.article.NEWS .m a`, els => {
            return els.map(el => ({ src: el.href, title: el.innerText, source: 'IGN' }))
        })
    } catch (error) {
        return []
    }
}

const crawlerIGN = async () => {
    let browser = null
    try {
        browser = await puppeteer.launch()
        const page = await browser.newPage()
        return await getIGNNews(page)
    } catch (error) {  
        console.log(error) 
    } finally {
        if (browser) {
            await browser.close()
        } 
    }  
}

crawlerIGN()

module.exports = crawlerIGN