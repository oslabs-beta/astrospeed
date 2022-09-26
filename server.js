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
  execSync('npm run astro build')
  console.log('done building')
}

function runAstroApp() {
  execSync('npm run astro preview', (err, stdout, stderr) => {
    if (err) console.log('error', error.message);
    if (stderr) console.log('error', stderr);
    console.log(stdout);
  })
  console.log('site live')
}


//serve the astro app
//obsolete - now using `astro preview`
let server;
async function serveAstroApp() {
  const app = express();
  app.use('*', express.static('dist'));
  server = await app.listen(3500, () => console.log(`Server listening on port 3500`));
}





async function getLighthouseResultsPuppeteer(url) {
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

async function getLighthouseReport() {

  console.log('running lighthouse report')
  const lhr = await getLighthouseResultsPuppeteer(`http://localhost:3500/index.html`);
  console.log('lighthouse report complete');
  //save the lighthouse report to JSON
  const data = JSON.stringify(lhr);
  let existingData;
  // try {
  //   //assume there is already data in the json, read it in
  //   existingData = fs.readFileSync('node_modules/astrospeed/lighthouse.json', 'utf-8');
  // } catch (err) {
    fs.writeFileSync('node_modules/astrospeed/lighthouse.json', data);
  // }
  console.log('wrote json')
  server.close();
  console.log('closed express server')

  // const buildReport = 'npm run buildreport --prefix node_modules/astrospeed/'
  // await exec(buildReport, (err, stdout, stderr) => {
  //   if (err) console.log('error', err.message);
  //   if (stderr) console.log('error', stderr);
  //   console.log('built report html');
  // })
  // TO DO: instead of build astro report (above), build react/webpack HTML!
  // At build time, the react app will read in the JSON file written above
}
function buildReport() {
  
}

buildAstroApp();
// runAstroApp();

serveAstroApp();
getLighthouseReport();



//append to the React app HTML