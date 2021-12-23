const cheerio = require('cheerio')
const puppeteer = require('puppeteer-extra')
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
// add stealth plugin and use defaults (all evasion techniques)
const url = 'https://fitgirl-repacks.site'
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());
const today = new Date();

(async function main() {
    try {
        const browser = await puppeteer.launch();
        const [page] = await browser.pages();

        await page.goto(url, { waitUntil: 'networkidle0' });

        await page.waitForSelector('.entry-content')

        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        
        const $ = cheerio.load(bodyHTML);
        

        const upcomingRepacks = $('.category-uncategorized > div.entry-content > h3').text()

        console.log(today)
        console.log(upcomingRepacks)
        
    } catch (err) {
        console.error(err);
    }
})();
