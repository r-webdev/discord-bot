const { loader, permissions } = require('@bot');
const { client } = require('@bot').client;
const { Server, Configuration } = require('@bot').database;

const registeredCommands = [];
const prefix = '!';

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
  const commandRegex = compiled;

  if (checkCommand(command, params)) {
    registeredCommands.push({
      command,
      params,
      description,
      response,
      compiled,
      commandRegex,
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

const getAllowedRoles = (serverPermissions, userRoles, plugin) => {
  // eslint-disable-next-line radix
  const roles = userRoles.flatMap(x => parseInt(x.id));
  const allowedRoles = [];
  for (let x = 0; x < serverPermissions.length; x += 1) {
    const perm = serverPermissions[x];
    if (perm.plugin === plugin.discrim && roles.includes(perm.roleID)) {
      allowedRoles.push(perm.roleID);
    }
  }
  return allowedRoles;
};

client.on('message', async (msg) => {
  const message = msg.content;
  const serverPrefix = await this.getPrefix(msg.guild.id);
  const serverPermissions = await permissions.getServerPermissions(msg.guild.id);
  for (let i = 0; i < registeredCommands.length; i += 1) {
    const command = registeredCommands[i];
    const regex = new RegExp(`\\${serverPrefix}${command.compiled}`);
    const match = message.match(regex) ? message.match(regex) : [];
    const pluginState = loader.commandState(command);
    const plugin = loader.fromCommand(command);
    const userRoles = msg.member.roles.array();
    const allowedRoles = getAllowedRoles(serverPermissions, userRoles, plugin);
    console.log(allowedRoles);
    if (pluginState && (`${serverPrefix}${command.compiled}` === message || match[1]) && (plugin.ignorePermissions || allowedRoles.length >= 1)) {
      return command.response(msg, match);
    }
  }
  return null;
});
