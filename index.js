//TO-DO
const { exec } = require("child_process");

const runDevServer = 'npm run dev';

//this runs the astro app on localhost:3000
exec(runDevServer, (err, stdout, stderr) => {
  if (err) console.log('error', error.message);
  if (stderr) console.log('error', stderr);
  console.log(stdout);
})