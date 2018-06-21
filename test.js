const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://movie.douban.com/tag/#/?sort=R&range=8,10&tags=%E7%94%B5%E5%BD%B1,%E7%BE%8E%E5%9B%BD')
  await page.screenshot({path: 'douban.png'})
  await browser.close()
})()