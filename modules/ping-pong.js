const commands = require('../core/commands');
const discord = require('../core/client');

commands.register('ping', '', 'Ping the bot', (msg) => {
  msg.reply('PONG');
});

commands.register('ping', 'pong', 'Pong the bot', (msg) => {
  msg.reply('PING');
});

commands.register('ping', ['pong', 'ping', 'pong', 'ping'], 'Pong the bot', (msg) => {
  msg.reply('PONG');
});

commands.register('ping', ['pong', 'ping', 'pong'], 'Ping the bot', (msg) => {
  msg.reply('PING');
});

console.log('Registered Ping-Pong Module');
