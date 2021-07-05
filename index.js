module.exports = require('./eslintrc.json')
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const args = yargs
  .usage('Usage $0 [options]')
  .help('help')
  .alias('help', 'h')
  .version('0.0.1')
  .alias('version', 'v')
  .example('$0 --entry filesDir --output dist', '--> Example for runing my app')
  .option('entry', {
    alias: 'e',
    describe: 'Source directory for searh',
    demandOption: true
  })
  .option('delete', {
    alias: 'd',
    describe: 'Delete source dir, not implemented yet',
    demandOption: false
  })
  .option('output', {
    alias: 'o',
    describe: 'Destination dir',
    demandOption: true
  })
  .epilog('First home work')
  .argv

const copyFiles = () => {
  console.log(filesList);
  filesList.forEach(file => {
    const firstFileLetter = file.key.charAt(0);
    fs.exists(firstFileLetter, (err, folder) => {
      if (!folder) {
        fs.mkdir(path.join(destinationDir,firstFileLetter), (err, data) => {
          // теперь надо перенести файлы в нашу директорию
          fs.copyFile(file.value, destinationDir + '\\'+ firstFileLetter + '\\' + file.key, (err) => {
            if (err) {
              console.log(err);
              process.exit(err);
            }
          });
        });
      }
    });
  })
}

const parseDir = (dirName) => {
  try {
    const files = fs.readdirSync(dirName);
    files.forEach(fileItem => {
      const fileFullName = path.join(dirName, fileItem);
      let state = fs.statSync(fileFullName);
      if (state.isDirectory()) {
        parseDir(fileFullName);
      } else {
        const relativePath = path.resolve(process.cwd() + '\\' + dirName, fileItem);
        filesList.push({ key: fileItem, value: relativePath });
      }
    });
  } catch (err) {
    console.err('Errror occured');
    console.log(err);
    // process.exit(err);    
  }
}

const sourceDir = args.e;
const destinationDir = args.o;
let filesList = [];
parseDir(sourceDir);
fs.mkdir(destinationDir, (err, data) => {
  if (err) {
    console.log(err);
    process.exit(err);
  }
  copyFiles();
})
