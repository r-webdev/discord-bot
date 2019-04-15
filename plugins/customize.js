const { commands } = require('@bot');
const { client, discord } = require('@bot').client;

exports.command = 'customize';

commands.register(this.command, '', 'customize', 'Customize Help', async (msg) => {
  const pluginCommands = commands.getCommands('customize');
  const em = new discord.RichEmbed();
  const prefix = await commands.getPrefix();
  em.setTitle('Customize | Help');
  pluginCommands.forEach((c) => {
    em.addField(`${prefix}${c.usage}`, `${c.description}`);
  });
  msg.channel.send(em);
});

commands.register(this.command, 'game (.*)', 'customize game <game-name>', 'Change the bots game', (msg, extra) => {
  client.user.setActivity(extra[1]);
  msg.reply(`Set game to: ${extra[1]}`);
});

commands.register(this.command, 'command prefix (.*)', 'customize command prefix <prefix>', 'Change the bots command Prefix', async (msg, extra) => {
  const changed = await commands.setPrefix(msg.guild.id, extra[1]);
  if (changed) {
    msg.reply(`Set prefix to: ${extra[1]}`);
  } else {
    msg.reply('Error setting prefix :(');
  }
});

exports.name = 'Customize';
exports.version = '1.0.0';
exports.description = 'Customize the bot';
exports.discrim = 'customize';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
