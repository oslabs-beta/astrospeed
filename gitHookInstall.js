#!/usr/bin/env node

const fs = require("fs");
const { resolve } = require("path");

const hook = "post-commit";
//Get files of hook template
//const hookFileContents = fs.readFileSync(`./${hook}`).toString();

function installHooks() {
  //Make sure there is a .git folder
  const gitRoot = resolve(process.env.INIT_CWD + "/.git");
  if (fs.existsSync(gitRoot)) {
    const hooksDir = resolve(gitRoot, "hooks");
    ensureDirExists(hooksDir); //Add hooks folder if it doesn't exist
    const hookFile = resolve(hooksDir, hook);
    if (fs.existsSync(hookFile)) {
      let fileContents = fs.readFileSync(hookFile, 'utf-8');
      if (fileContents.includes('npx astrospeed-snap')) {
        console.warn("Correct git hook already in place");
      } else {
        fs.appendFileSync(hookFile, '\nnpx astrospeed-snap &\n');
        console.log('astroSpeed hook appended to existing post-commit hooks');
      }
      return;
    }
    fs.writeFileSync(
      hookFile,
      `#!/bin/sh\nnpx astrospeed-snap &\n`
    ); //create hook file
    fs.chmodSync(hookFile, "755"); //make hook file executable
    console.log("astroSpeed git integration was successful!");
  } else {
    console.warn("This does not seem to be a git project.");
  }
}

function ensureDirExists(dir) {
  fs.existsSync(dir) || fs.mkdirSync(dir);
}

installHooks();
