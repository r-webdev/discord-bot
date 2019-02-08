const discord = require('./client');

const registeredCommands = [];
let prefix = '!';

const checkCommand = (command, body) => {
  for (let i = 0; i < registeredCommands.length; i += 1) {
    const c = registeredCommands[i];
    if (c.command === command && c.body === body) {
      return false;
    }
  }
  return true;
};

// Cleanest way to allow [] for param chaining...
Array.prototype.toString = function () { return this.join(' '); };

exports.register = (command, params, description, response) => {
  const compiled = params === '' ? `${command}` : `${command} ${params}`;

  if (checkCommand(command, params)) {
    registeredCommands.push({
      command,
      params,
      description,
      response,
      compiled,
    });
  }
};

exports.setPrefix = (newPrefix) => {
  prefix = newPrefix;
};

exports.getCommands = command => registeredCommands.filter(e => e.command === command);

exports.getAllCommands = () => registeredCommands;

discord.client.on('message', (msg) => {
  const message = msg.content;
  for (let i = 0; i < registeredCommands.length; i += 1) {
    const c = registeredCommands[i];
    const r = new RegExp(`${prefix}${c.compiled}`);
    const match = message.match(r) ? message.match(r) : [];
    if (`${prefix}${c.compiled}` === message || match[1]) {
      return c.response(msg, match);
    }
  }
  return null;
});
