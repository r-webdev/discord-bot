const { commands, loader } = require('@bot');
const { discord } = require('@bot').client;

exports.command = 'help';

commands.register(this.command, '', 'Shows the help message', async (msg) => {
  const modules = loader.getPlugins();
  const em = new discord.RichEmbed();
  const prefix = await commands.getPrefix(msg.guild.id);
  modules.forEach(m => {
    if (m.discrim) {
      em.addField(`${prefix}${this.command} ${m.discrim}`, `Displays help for ${m.name}`);
    }
  });
  msg.reply(em);
});

commands.register(this.command, '(.*)', 'Shows the help message', (msg, extra) => {
  const module = loader.getPlugin(extra[1]);
  if (module) {
    const em = new discord.RichEmbed();
    const moduleCommands = commands.getCommands(module.command);
    em.setTitle(`${module.name} | Help`);
    moduleCommands.forEach(c => {
      em.addField(`${commands.getPrefix()}${c.command} ${c.params}`, `${c.description}`)
    });
    return msg.channel.send(em);
  } else {
    return msg.channel.send(`Are you sure that \`${extra[1]}\` is a valid plugin descriminator`);
  }
});

exports.name = 'Help';
exports.state = true;
