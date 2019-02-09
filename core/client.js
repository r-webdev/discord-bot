const Discord = require('discord.js');
const client = new Discord.Client();
const LOGGER = require('./logger');
console.log(process.env.DISCORD_KEY);
const key = process.env.DISCORD_KEY;

client.on('ready', () => {
  client.user.setActivity("cowsay");
  LOGGER.log('notify', 'Bot Started');
});

client.login(key);

module.exports.discord = Discord;
module.exports.client = client;
