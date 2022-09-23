//TO-DO
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec, execSync } = require("child_process");



//this builds the astro app to the 'dist' folder
function buildAstroApp() {
  const buildAstroAppCmd = 'npm run build';
  execSync(buildAstroAppCmd)
  console.log('done building')
}

//serve the astro app
let server;
async function serveAstroApp() {
  const app = express();
  app.use('*', express.static('dist'));
  server = app.listen(3500, () => console.log(`Server listening on port 3500`));
}

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
  console.log('running lighthouse report')
  const lhr = await getLighthouseResultsPuppeteer(`http://localhost:3500/index.html`);
  console.log('lighthouse report complete');
  //save the lighthouse report to JSON
  const data = JSON.stringify(lhr);
  fs.writeFileSync('node_modules/astrospeed/lighthouse.json', data);
  server.close();
  console.log('closed express server')

  const buildReport = 'npm run buildreport --prefix node_modules/astrospeed/'
  await exec(buildReport, (err, stdout, stderr) => {
    if (err) console.log('error', err.message);
    if (stderr) console.log('error', stderr);
    console.log('built report html');
  })
}

buildAstroApp();
serveAstroApp();
getReport();

