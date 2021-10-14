const fs = require('fs');
const md5 = require('md5');
require('log-timestamp');

// directory and file to watch
const watchedFile = './app/components/my-file.js';

console.log(`Watching for file changes on ${watchedFile}`);

let md5Previous = null;
let fsWait = false;
fs.watch(watchedFile, (event, filename) => {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);
    const md5Current = md5(fs.readFileSync(watchedFile));
    if (md5Current === md5Previous) {
      return;
    }
    md5Previous = md5Current;
    console.log(`${filename} file Changed`);
  }
});
