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

//build the user's astro app to the 'dist' folder
function buildAstroApp() {
  const buildAstroAppCmd = 'npm run build';
  execSync(buildAstroAppCmd)
}

//declare server globally so we can call server.close() later when the lighthouse report completes.
let server;

async function serveAstroApp() {
  //serve the astro app on port 3500
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
  //get latest commit from git log, format it to include commit body (%B), timestamp (%ai), hash (%h)
  let commitMsg = execSync('git log -1 --pretty="%B%ai%n%h"').toString().replace(/\n/g,',').split(',').slice(0,3);
  let commitProperties = ['msg', 'time', 'hash']
  let newCommitData = {};
  for (let i = 0; i < 3; i++) {
    newCommitData[commitProperties[i]] = commitMsg[i];
  }
  //return latest object with latest commit details
  return newCommitData;
}

async function getReport() {
  //use puppeteer to get lighthouse results object and store it in lhr
  const lhr = await getLighthouseResultsPuppeteer(`http://localhost:3500/index.html`);
  //close express server after lighthouse returns results
  server.close();
  //remove unused screenshots from lhr to save space 
  lhr['audits']['screenshot-thumbnails']['details'] = null;
  lhr['audits']['final-screenshot']['details']['data'] = null;
  lhr['audits']['full-page-screenshot']['details'] = null;
  //add git details to the lighthouse report under key 'git'
  lhr['git'] = getCommitDetails();

  // read results.js
  const data = readExistingData();
  // push latest report + git details into data array
  data.push(lhr);

  //resultsOutput is a JS expression that assigns window.results to the data array. 
  const resultsOutput = 'window.results = ' + JSON.stringify(data);
  //outputDir is the astro project two levels up + folder 'astrospeed'. (cwd is inside node_modules/astrospeed)
  const outputDir = path.resolve(path.join(__dirname, '../../astrospeed/'));

  if (!fs.existsSync(outputDir)) {
    //if the outputDir doesn't exist, create it
    fs.mkdirSync(outputDir)
  }
  //write resultsOutput to results.js
  fs.writeFileSync('./astrospeed/results.js', resultsOutput);

  if (!fs.existsSync(path.join(outputDir, 'bundle.js')) || !fs.existsSync(path.join(outputDir, 'index.html'))) {
    //if bundle.js or index.html doesn't exist in the astro project folder under 'astrospeed' dir, copy them over from node_modules/astrospeed
    fs.copyFileSync(path.resolve(path.join(__dirname, './astrospeed/index.html')), path.join(outputDir, 'index.html'));
    fs.copyFileSync(path.resolve(path.join(__dirname, './astrospeed/bundle.js')), path.join(outputDir, 'bundle.js'));
  }

  //write to user's terminal the path of the astrospeed report. 
  console.log('Astrospeed report available at', path.resolve(__dirname, '../../astrospeed/index.html'))
}

buildAstroApp();
serveAstroApp();

function readExistingData () {
  //check if results.js already exists, if so return the contents, otherwise return empty array
  try {
    const pathToFile = './astrospeed/results.js'
    const oldData = fs.readFileSync(pathToFile);
    //remove the window.results assignment to just get the array
    const oldDataParsed = oldData.slice(16)
    return JSON.parse(oldDataParsed);
  } catch (err){
    return [];
  }
}