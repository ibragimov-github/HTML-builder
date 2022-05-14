const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');
const stylesArray = [];
const cssPath = path.join(__dirname, '/styles');
const readDirFunc = async function(pathDir) {
  fsPromise.readdir(pathDir, {'withFileTypes':true}).then(filenames => {
    for (let file of filenames) {
      if (file.isFile()) {
        if (path.extname(path.join(cssPath, file.name)) === '.css') {
          fsPromise.readFile(path.join(cssPath, file.name)).then(result => {
            stylesArray.push(result.toString());
            fs.writeFile(path.join(__dirname, '/project-dist', 'bundle.css') ,stylesArray.join(''), err => {
              if (err) console.error(err);
            });
          }).catch(err => {
            console.error(err);
          })
        }

      }
    }
  }).catch(err => {
    console.log(err);
  });
}

readDirFunc(path.join(__dirname, '/styles'));
