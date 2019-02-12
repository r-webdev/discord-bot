const { loader } = require('@bot');
const { discord, client } = require('@bot').client;
const { Server, Configuration } = require('@bot').database;

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

exports.setPrefix = async (serverID, newPrefix) => {
  const server = await Server.findOne({ serverID });
  const config = await Configuration.updateOne({ server }, { prefix: newPrefix });
  return config ? config.n >= 1 : false;
};

exports.getCommands = command => registeredCommands.filter(e => e.command === command);

exports.getPrefix = async (serverID) => {
  const server = await Server.findOne({ serverID });
  const config = await Configuration.findOne({ server });
  return config ? config.prefix : prefix;
};

exports.getAllCommands = () => registeredCommands;

client.on('message', async (msg) => {
  const message = msg.content;
  const serverPrefix = await this.getPrefix(msg.guild.id);
  for (let i = 0; i < registeredCommands.length; i += 1) {
    const command = registeredCommands[i];
    const r = new RegExp(`\\${serverPrefix}${command.compiled}`);
    const match = message.match(r) ? message.match(r) : [];
    const plugin = loader.commandState(command);
    if (plugin && (`${serverPrefix}${command.compiled}` === message || match[1])) {
      return command.response(msg, match);
    }
  }
  return null;
});
