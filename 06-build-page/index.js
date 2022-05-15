const fs = require('fs');
const path = require('path');
const htmlArray = [];
const fsPromise = require('fs/promises');
const copyDir = async function(input, output) {
  const fs  = require('fs');
  const path = require('path');
  const fsPromises = require('fs/promises');
  await fsPromises.rm(output, {recursive:true, force:true});
  await fsPromises.mkdir(output, {recursive:true});
  await fs.readdir(input, {'withFileTypes':true}, (err, items) =>{
    for (let i of items) {
      if (i.isFile()) {
        fsPromises.copyFile(path.join(input, i.name), path.join(output,i.name))
      }
      else {
        copyDir(path.join(input, `/${i.name}`), path.join(output, `/${i.name}`));
      }
    }
  }) 
}
const stylesArray = [];
const cssPath = path.join(__dirname, '/styles');
const readDirFunc = async function(pathDir) {
  fsPromise.readdir(pathDir, {'withFileTypes':true}).then(filenames => {
    for (let file of filenames) {
      if (file.isFile()) {
        if (path.extname(path.join(cssPath, file.name)) === '.css') {
          fsPromise.readFile(path.join(cssPath, file.name)).then(result => {
            stylesArray.push(result.toString());
            fs.writeFile(path.join(__dirname, '/project-dist', 'style.css') ,stylesArray.join(''), err => {
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
fsPromise.mkdir(path.join(__dirname, '/project-dist'), {recursive:true});
fsPromise.mkdir(path.join(__dirname, '/project-dist', '/assets'), {recursive:true});
copyDir(path.join(__dirname, '/assets'), path.join(__dirname, '/project-dist', '/assets'));
readDirFunc(path.join(__dirname, '/styles'));
fsPromise.readFile(path.join(__dirname, 'template.html')).then(result => {
  htmlArray.push(result.toString());
  let acc = htmlArray.join('');
  fsPromise.readFile(path.join(__dirname, '/components', 'header.html')).then(result => {
    acc = acc.replace('{{header}}', result.toString());
    fsPromise.readFile(path.join(__dirname, '/components', 'articles.html')).then(result => {
      acc = acc.replace('{{articles}}', result.toString());
      fsPromise.readFile(path.join(__dirname, '/components', 'footer.html')).then(result => {
        acc = acc.replace('{{footer}}', result.toString());
        fsPromise.writeFile(path.join(__dirname, '/project-dist', 'index.html'), acc);
      })
    })
  })
}).catch(error => {
  console.log(error);
})
