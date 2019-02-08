const commands = require('../core/commands');
const { client } = require('../core/client');

commands.register(this.command, '', 'Customize Help', (msg) => {
  msg.reply('Customize the bot with other commands!');
});

commands.register(this.command, 'game (.*)', 'Change the bots game', (msg, extra) => {
  client.user.setActivity(extra[1]);
  msg.reply(`Set game to: ${extra[1]}`);
});

commands.register(this.command, ['command', 'prefix', '(.*)'], 'Change the bots command Prefix', (msg, extra) => {
  commands.setPrefix(extra[1]);
  msg.reply(`Set prefix to: ${extra[1]}`);
});

exports.name = 'Customize';
exports.version = '1.0.0';
exports.description = 'Customize the bot';
exports.command = 'customize';
exports.discrim = 'customize';
exports.state = true;
exports.toggle = () => this.state = !this.state;
