const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  client.user.setActivity("Powered By Node");
});

client.login('<KEY>');

module.exports.discord = Discord;
module.exports.client = client;
