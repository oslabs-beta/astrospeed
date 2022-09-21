//TO-DO
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();

const fs = require('fs');

const { exec } = require("child_process");

const buildAstroAppCmd = 'npm run build';
console.log(path.resolve('/dist/'))

app.use('*', express.static('dist'));
const server = app.listen(3500, () => console.log(`Server listening on port: 3500`));

//this builds the astro app to the 'dist' folder
exec(buildAstroAppCmd, (err, stdout, stderr) => {
  if (err) console.log('error', err.message);
  if (stderr) console.log('error', stderr);
  console.log(stdout);
})

//run lighthouse report on localhost:3000
const launchChromeAndRunLighthouse = url => {
  return chromeLauncher.launch({chromeFlags:['--headless']}).then(chrome => {
    const opts = {
      port: chrome.port
    };
    return lighthouse(url, opts).then(results => {
      return chrome.kill().then(() => results.report);
    });
  });
};


// launchChromeAndRunLighthouse("https://www.codesmith.io").then(results => {
//   console.log(results);
//   const data = JSON.stringify(results);
//   fs.writeFileSync('lighthouse.json', data);
// });
async function getLighthouseResultsPuppeteer(url, gitMessage) {
  
  const chrome = await puppeteer.launch({args: ['--remote-debugging-port=9222'],});
  const options = {
    logLevel: 'silent', 
    output: 'html', 
    maxWaitForLoad: 10000, 
    port: 9222
  };
  const runnerResult = await lighthouse(url, options);
  await chrome.close();
  return runnerResult.lhr;
}

async function getReport() {
  const lhr = await getLighthouseResultsPuppeteer(`http://localhost:3500/index.html`);
  await console.log(lhr);
  //save the lighthouse report to JSON
  const data = JSON.stringify(lhr);
  fs.writeFileSync('lighthouse.json', data);

}
getReport();


//append to the React app HTML