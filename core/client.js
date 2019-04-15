const Discord = require('discord.js');
const { log } = require('@bot').logger;

const client = new Discord.Client();

const key = process.env.DISCORD_KEY;

client.on('ready', () => {
  client.user.setActivity('bot simulator');
  log('notify', 'Bot Started');
});

// client.on('error', (error) => {
//   log('store', 'Websocket encountered an error: ' + error.message);
//   log('warn', 'Please investigate.');
// });

client.login(key);

module.exports.discord = Discord;
module.exports.client = client;
