#!/usr/bin/env node

const fs = require("fs");
const { resolve } = require("path");

const hookString = "npx astrospeed-snap &";
  //Make sure there is a .git folder
const gitRoot = resolve(process.env.INIT_CWD + "/.git");

if (fs.existsSync(gitRoot)) {
  const hookFile = resolve(gitRoot, "hooks/post-commit");
  //check if hook file exists
  if (fs.existsSync(hookFile)) {
    let fileContents = fs.readFileSync(hookFile, 'utf-8');
    //check if our hook string is present in hook file
    if (fileContents.includes(hookString)) {
      const newContents = fileContents.replaceAll(hookString,'');
      fs.writeFileSync(hookFile, newContents, 'utf-8');
      console.log('astroSpeed post-commit hooks removed');
    } else {
      //else hookstring is not present
      console.warn("No astroSpeed hooks found in post-commit hooks");
    }
  } else {
    // no post-commit file found in hooks
    console.warn('No post-commit hooks found');
  }

} else {
  // else no .git folder
  console.warn("This does not seem to be a git project.");
}
