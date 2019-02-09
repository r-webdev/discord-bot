const { loader } = require('@bot');
const { discord, client } = require('@bot').client;

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

exports.getPrefix = () => prefix;

exports.getCommands = command => registeredCommands.filter(e => e.command === command);

exports.getAllCommands = () => registeredCommands;

exports.getModuleHelp = (discrim) => {
  const module = loader.getModule(discrim);
  if (module) {
    const em = new discord.RichEmbed();
    const moduleCommands = this.getCommands(module.command);
    em.setTitle(`${module.name} | Help`);
    moduleCommands.forEach(c => {
      em.addField(`${this.getPrefix()}${c.command} ${c.params}`, `${c.description}`)
    });
    return em;
  } else {
    return `Are you sure that \`${discrim}\` is a valid module descriminator`;
  }
}

client.on('message', (msg) => {
  const message = msg.content;
  for (let i = 0; i < registeredCommands.length; i += 1) {
    const command = registeredCommands[i];
    const r = new RegExp(`${prefix}${command.compiled}`);
    const match = message.match(r) ? message.match(r) : [];
    if (loader.getState(command) && (`${prefix}${command.compiled}` === message || match[1])) {
      return command.response(msg, match);
    }
  }
  return null;
});
