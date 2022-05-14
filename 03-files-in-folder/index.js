const fs = require('fs');
const readdir = require('fs/promises');
const path = require('path');
const stat = fs.stat;
const secretFolderPath = path.join(__dirname + '/secret-folder');
const filesPathArr = [];
fs.readdir(secretFolderPath,{'withFileTypes':true}, (err, items) => {
  if (err) {throw err;}
  else {
    for (let i of items) {
      if (i.isFile()) {
        const dir = path.join(secretFolderPath, i.name);
        const fileName = i.name.split('.').slice(0, i.name.split('.').length - 1).join('');
        const fileExtension = path.extname(dir).split('.').join('');
        stat(dir, (err, stats)=> {
          console.log(`${fileName} - ${fileExtension} - ${stats.size/1000}kb`)
        })

      }
    }
  }
})

