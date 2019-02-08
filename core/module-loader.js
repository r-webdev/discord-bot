const fs = require('fs');
const PATH = require('path');

const load = (path) => {
  fs.readdir(path, (err, files) => {
    files.forEach(f => {
      const fPath = PATH.join(path, f);
      fs.lstat(fPath, (err, stat) => {
        if (stat.isDirectory()) {
          load(fPath);
        } else {
          require(fPath);
        }
      });
    });
  });
}

exports.loadModules = () => {
  const modulePath = PATH.join(__dirname, '..', 'modules');
  load(modulePath);
}