#!/usr/bin/env node

const fs = require("fs");
const { resolve } = require("path");

const hookString = "npx astrospeed-snap &";
//Get files of hook template
//const hookFileContents = fs.readFileSync(`./${hook}`).toString();

// function uninstallHook() {
  //Make sure there is a .git folder
const gitRoot = resolve(process.env.INIT_CWD + "/.git");

if (fs.existsSync(gitRoot)) {
  // const hooksDir = resolve(gitRoot, "hooks");
  // ensureDirExists(hooksDir); //Add hooks folder if it doesn't exist
  const hookFile = resolve(gitRoot, "hooks/post-commit");
  if (fs.existsSync(hookFile)) {
    let fileContents = fs.readFileSync(hookFile, 'utf-8');
    if (fileContents.includes(hookString)) {
      const newContents = fileContents.replaceAll(hookString,'');
      fs.writeFileSync(hookFile, newContents, 'utf-8');
      console.log('astroSpeed post-commit hooks removed');
    } else {
      console.warn("No astroSpeed hooks found in post-commit hooks");
    }
  } else {
    console.warn('No post-commit hooks found');
  }
  // // 1> /dev/null 2> /dev/null means shell stdOut (1) and stdErr(2) are redirected to null
  // fs.writeFileSync(
  //   hookFile,
  //   `#!/bin/sh
  //     npx astrospeedsnap`
  //   //above line will hide standard output but show errors, for debugging
  //   // npx astrospeedsnap 1> ./astroSpeed/run.log 2> ./astroSpeed/error.log`
  //   // npx astrospeedsnap 1> /dev/null 2> /dev/null`
  // ); //create hook file
  // fs.chmodSync(hookFile, "755"); //make hook file executable
  // console.log("astroSpeed git integration was successful!");
} else {
  console.warn("This does not seem to be a git project.");
}
// }

// function ensureDirExists(dir) {
//   fs.existsSync(dir) || fs.mkdirSync(dir);
// }

// function addToGitignore() {
//   const gitignoreFilePath = resolve(process.env.INIT_CWD + "/.gitignore");
//   fs.readFile(gitignoreFilePath, (err, data) => {
//     if (err) throw err;
//     if (!/astroSpeed\//.test(data.toString())) {
//       fs.appendFile(gitignoreFilePath, "\nastroSpeed/", function (err) {
//         if (err) throw err;
//         console.log("Added to gitignore");
//       });
//     }
//   });
// }

// addToGitignore();
// installHooks();
