const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(textPath);
stream.on('data', data => {
  console.log(data.toString());
});