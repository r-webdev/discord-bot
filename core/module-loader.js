const fs = require('fs');
const PATH = require('path');

const { logger } = require('@bot');

const loadedModules = [];

const load = (path) => {
  fs.readdir(path, (err, files) => {
    files.forEach(f => {
      const fPath = PATH.join(path, f);
      fs.lstat(fPath, (err, stat) => {
        if (stat.isDirectory()) {
          load(fPath);
        } else {
          const mod = require(fPath);
          loadedModules.push(mod);
          logger.log('notify', `Module: [${mod.name || 'ERROR'}] Version: [${mod.version || '0'}] Loaded.`);
        }
      });
    });
  });
};

exports.loadModules = () => {
  const modulePath = PATH.join(__dirname, '..', 'modules');
  load(modulePath);
};

exports.getModules = () => loadedModules;

exports.getState = ({ command }) => loadedModules.filter(m => m.command === command && m.state === true).length > 0;

exports.getModule = (discrim) => loadedModules.filter(m => m.discrim === discrim)[0];
