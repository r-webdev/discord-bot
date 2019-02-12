const { commands } = require('@bot');
const { client, discord } = require('@bot').client;

exports.command = 'customize';

commands.register(this.command, '', 'Customize Help', (msg) => {
  const pluginCommands = commands.getCommands('customize');
  const em = new discord.RichEmbed();
  em.setTitle(`Customize | Help`);
  pluginCommands.forEach(c => {
    em.addField(`${commands.getPrefix()}${c.command} ${c.params}`, `${c.description}`)
  });
  msg.channel.send(em);
});

commands.register(this.command, 'game (.*)', 'Change the bots game', (msg, extra) => {
  client.user.setActivity(extra[1]);
  msg.reply(`Set game to: ${extra[1]}`);
});


commands.register(this.command, ['command', 'prefix', '(.*)'], 'Change the bots command Prefix', async (msg, extra) => {
  const changed = await commands.setPrefix(msg.guild.id, extra[1]);
  changed ? msg.reply(`Set prefix to: ${extra[1]}`) : msg.reply(`Could not update the prefix, did you run {!install}?`);
});


exports.name = 'Customize';
exports.version = '1.0.0';
exports.description = 'Customize the bot';
exports.discrim = 'customize';
exports.state = true;
exports.toggle = () => this.state = !this.state;
