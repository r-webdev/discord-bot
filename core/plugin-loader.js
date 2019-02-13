const fs = require('fs');
const PATH = require('path');

const { logger } = require('@bot');

const loadedPlugins = [];

const load = (path) => {
  fs.readdir(path, (readError, files) => {
    if (readError) throw readError;
    files.forEach((f) => {
      const fPath = PATH.join(path, f);
      fs.lstat(fPath, (lstatErr, stat) => {
        if (lstatErr) throw lstatErr;
        if (stat.isDirectory()) {
          load(fPath);
        } else {
          // eslint-disable-next-line import/no-dynamic-require
          const mod = require(fPath); // eslint-disable-line global-require
          loadedPlugins.push(mod);
          logger.log('notify', `Plugin: [${mod.name || 'ERROR'}] Version: [${mod.version || '0'}] Loaded.`);
        }
      });
    });
  });
};

exports.init = () => {
  const modulePath = PATH.join(__dirname, '..', 'plugins');
  load(modulePath);
};

exports.getPlugins = () => loadedPlugins;

// eslint-disable-next-line arrow-body-style
exports.commandState = ({ command }) => {
  return loadedPlugins.filter(m => m.command === command && m.state === true).length > 0;
};

exports.getPlugin = discrim => loadedPlugins.filter(m => m.discrim === discrim)[0];

exports.fromCommand = ({ command }) => loadedPlugins.filter(m => m.command === command)[0];
