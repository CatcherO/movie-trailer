// test puppeteer
// const puppeteer = require('puppeteer')

// ;(async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://movie.douban.com/tag/#/?sort=R&range=8,10&tags=%E7%94%B5%E5%BD%B1,%E7%BE%8E%E5%9B%BD')
//   await page.screenshot({path: 'douban.png'})
//   await browser.close()
// })()

// test child_process

// var exec = require('child_process').exec;

// var ls = exec('ls -l', function (error, stdout, stderr) {
//   if (error) {
//     console.log(error.stack);
//     console.log('Error code: ' + error.code);
//   }
//   console.log('Child Process STDOUT: ' + stdout);
// });
var exec = require('child_process').exec;
var child = exec('ls -l');

child.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
  console.log('stdout: ' + data);
});
child.on('close', function(code) {
  console.log('closing code: ' + code);
});