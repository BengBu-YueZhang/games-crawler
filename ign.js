const puppeteer = require('puppeteer')

const getIGNNews = async (page) => {
    try {
        console.log(`ign 开始`)
        await page.goto('http://www.ign.xn--fiqs8s/')
        console.log(`ign 完成`)
        return await page.$$eval(`.article.NEWS .m h3 a`, els => {
            return els.map(el => ({ src: el.href, title: el.innerText, source: 'IGN' }))
        })
    } catch (error) {
        return []
    }
}

const crawlerIGN = async () => {
    let browser = null
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
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

module.exports = crawlerIGN