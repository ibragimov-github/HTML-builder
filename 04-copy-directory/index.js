const path = require('path');
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
        console.log(path.join(input, `/${i.name}`));
        copyDir(path.join(input, `/${i.name}`), path.join(output, `/${i.name}`));
      }
    }
  }) 
}

copyDir(path.join(__dirname, '/files'), path.join(__dirname, '/files-copy'));


