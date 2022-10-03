#!/usr/bin/env node

//TO-DO
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec, execSync } = require("child_process");

const DEV_MODE = false; //configurable to switch between running as a node_module in another project (false) or running as a standalone project (true)


console.log('Astrospeed report in progress...')

//this builds the astro app to the 'dist' folder
function buildAstroApp() {
  const buildAstroAppCmd = 'npm run build';
  execSync(buildAstroAppCmd)
  // console.log('done building')
}

//serve the astro app
let server;
async function serveAstroApp() {
  const app = express();
  app.use('*', express.static('dist'));
  server = app.listen(3500, () => getReport());
}

async function getLighthouseResultsPuppeteer(url) {
  const chrome = await puppeteer.launch({args: ['--remote-debugging-port=9224'],});
  const options = {
    logLevel: 'silent', 
    output: 'html', 
    maxWaitForLoad: 10000, 
    port: 9224
  };
  const runnerResult = await lighthouse(url, options);
  await chrome.close();
  return runnerResult.lhr;
}

function getCommitDetails() {
  // console.log('getting latest git commit details')
  /*
git log -1 --pretty="%B%at%n%h"
  add function to get commit data
  1664395260
  62b0165
  */
  let commitMsg = execSync('git log -1 --pretty="%B%ai%n%h"').toString().replace(/\n/g,',').split(',').slice(0,3);
  let commitProperties = ['msg', 'time', 'hash']
  let newCommitData = {};
  for (let i = 0; i < 3; i++) {
    newCommitData[commitProperties[i]] = commitMsg[i];
  }
  return newCommitData;
  // let data = readExistingData('git_commits');
  // data.push(commitMsg)
  // const dataJson = JSON.stringify(data)
  // const pathToGitJSON = DEV_MODE ? `./git_commits.json` : `node_modules/astrospeed/git_commits.json`

  // fs.writeFileSync(pathToGitJSON, dataJson);

}

async function getReport() {
  // console.log('running lighthouse report')
  const lhr = await getLighthouseResultsPuppeteer(`http://localhost:3500/index.html`);
  // console.log('lighthouse report complete');
  lhr['audits']['screenshot-thumbnails'] = null;
  lhr['audits']['finals-screenshot'] = null;
  lhr['git'] = getCommitDetails()

  // read prior JSON data
  const data = readExistingData();
    // push latest report into data array
  data.push(lhr);

  //save the lighthouse reports to JSON
  const resultsOutput = 'window.results = ' + JSON.stringify(data);
  const outputDir = path.resolve(path.join(__dirname, '../../astrospeed/'));

  if (!fs.existsSync(outputDir)) {
    //make the directory
    fs.mkdirSync(outputDir)
  }
  fs.writeFileSync('./astrospeed/results.js', resultsOutput);
  if (!fs.existsSync(path.join(outputDir, 'bundle.js'))) {
    fs.copyFileSync(path.resolve(path.join(__dirname, './astrospeed/index.html')), path.join(outputDir, 'index.html'));
    fs.copyFileSync(path.resolve(path.join(__dirname, './astrospeed/bundle.js')), path.join(outputDir, 'bundle.js'));
  }


  server.close();
  // console.log('closed express server')
  console.log('Astrospeed report written to', path.resolve(__dirname, '../../astrospeed/index.html'))

  // const buildReport = 'npm run build-dev --prefix node_modules/astrospeed/'
  // await exec(buildReport, (err, stdout, stderr) => {
  //   if (err) console.log('error', err.message);
  //   if (stderr) console.log('error', stderr);
  //   console.log('Astrospeed report written to', path.resolve(__dirname, '../../astrospeed/index.html'));
  // })
}

buildAstroApp();
serveAstroApp();

function readExistingData (file) {
  try {
    //check if node_modules/astrospeed/lighthouse.json exists
    // const oldData = fs.readFileSync('./lighthouse.json');
    const pathToFile = './astrospeed/results.js'
    const oldData = fs.readFileSync(pathToFile);
    const oldData2 = oldData.slice(16)
    //if it does, read it, parse it. (It should be an array of lighthouse json objects) 
    return JSON.parse(oldData2);
  } catch (err){
    // if it doesn't, return an empty array
    return [];
  }
}