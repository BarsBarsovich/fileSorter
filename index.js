module.exports = require('./eslintrc.json')
var fs = require('fs');
var path = require('path');

const copyFiles = () => {
  console.log(filesList);
  filesList.forEach(file => {
    if (file.key === undefined) {
      return;
    }

    console.log('FileName', file.key);
    const firstFileLetter = file.key.charAt(0);
    fs.exists(firstFileLetter, (err, folder) => {
      if (!folder) {
        fs.mkdir(firstFileLetter, (err, data) => {
          // теперь надо перенести файлы в нашу директорию
          fs.rename(file.value, firstFileLetter+'\\' + file.key, (err)=>{
            if (err){
              console.log(err);
              process.exit(err);
            }
          })
        })
      }
    });
  })
}

const parseDir = (dirName) => {
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
  copyFiles();
}

const filePath = 'filesTraining';
const args = process.argv;
let filesList = [{}];
parseDir(filePath);