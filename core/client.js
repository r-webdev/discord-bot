const Discord = require('discord.js');
const { log } = require('@bot').logger;

const client = new Discord.Client();

const key = process.env.DISCORD_KEY;

client.on('ready', () => {
  client.user.setActivity("cowsay");
  log('notify', 'Bot Started');
});

client.login(key);

module.exports.discord = Discord;
module.exports.client = client;
