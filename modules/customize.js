const commands = require('../core/commands');
const discord = require('../core/client');

commands.register('customize', '', 'Customize Help', (msg) => {
  msg.reply('Customize the bot with other commands!');
});

commands.register('customize', 'game (.*)', 'Change the bots game', (msg, extra) => {
  discord.client.user.setActivity(extra[1]);
  msg.reply(`Set game to: ${extra[1]}`);
});

commands.register('customize', ['command', 'prefix', '(.*)'], 'Change the bots command Prefix', (msg, extra) => {
  commands.setPrefix(extra[1]);
  msg.reply(`Set prefix to: ${extra[1]}`);
});

console.log(`Loaded Customize Module`);
