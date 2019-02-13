const { commands, loader } = require('@bot');
const { discord } = require('@bot').client;

exports.command = 'plugins';

commands.register(this.command, 'toggle (.*)', 'Toggle a plugin.', (msg, extra) => {
  const module = loader.getPlugin(extra[1]);
  if (module) {
    module.toggle();
    msg.reply(`Alright, module was toggled: ${module.state}`);
  } else {
    msg.reply(`Are you sure (${extra[1]}) is a valid module discriminator?`);
  }
});

commands.register(this.command, 'status (.*)', 'Check the status of a plugin', (msg, extra) => {
  const module = loader.getPlugin(extra[1]);
  if (module) {
    msg.reply(`Plugin status: ${module.state}`);
  } else {
    msg.reply(`Are you sure (${extra[1]}) is a valid plugin discriminator?`);
  }
});

commands.register(this.command, '', 'Get a list of plugin discriminators', (msg) => {
  const modules = loader.getPlugins();
  const em = new discord.RichEmbed();
  em.title = 'Plugins';
  modules.forEach((m) => {
    em.addField(`Name: ${m.name}`, `Discriminator: ${m.discrim || 'none'}`);
  });
  msg.reply(em);
});

exports.name = 'Plugin Loader';
exports.state = true;
