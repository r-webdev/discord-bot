const fs = require('fs');
const path = require('path');

const date = new Date();

exports.log = (level, ...data) => {
  console.log(`[${level}] ${data}`);
  if (level === 'store') {
    fs.appendFile(path.join(__dirname, 'logs', `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.txt`), `${data}\n`, function (err) {
      if (err) throw err;
    });
  }
}
