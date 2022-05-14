const path = require('path');
const fs = require('fs');
const process = require('process');
const readline = require('readline');
const input = require('process').stdin;
const output = require('process').stdout;
const rl = readline.createInterface({input, output});
fs.open(path.join(__dirname, 'testFile.txt'), 'w', (err) => {
  if(err) throw err;
});
console.log('Введите текст')

process.stdin.resume();
process.on('SIGINT', () => {
  console.log('Процесс завершен');
});


process.on('SIGINT', ()=> {
  process.exit();
});

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Процесс завершен');
    process.exit();
  }
  fs.appendFile(path.join(__dirname, 'testFile.txt'), `${input}\n`, (err) => {
    if(err) throw err;
});
});
