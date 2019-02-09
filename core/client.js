const Discord = require('discord.js');
const client = new Discord.Client();
const LOGGER = require('./logger');

const key = '<KEY>';

client.on('ready', () => {
  client.user.setActivity("Powered By Node");
  LOGGER.log('notify', 'Bot Started');
});

client.login(key);

module.exports.discord = Discord;
module.exports.client = client;
