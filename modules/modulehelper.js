const { commands, loader } = require('@bot');
const { discord } = require('@bot').client;

exports.command = 'modules';

commands.register(this.command, 'toggle (.*)', 'Toggle a module.', (msg, extra) => {
  const module = loader.getModule(extra[1]);
  if (module) {
    module.toggle();
    msg.reply(`Alright, module was toggled: ${module.state}`);
  } else {
    msg.reply(`Are you sure (${extra[1]}) is a valid module discriminator?`);
  }
});

commands.register(this.command, 'status (.*)', 'Check the status of a module', (msg, extra) => {
  const module = loader.getModule(extra[1]);
  if (module) {
    msg.reply(`Module status: ${module.state}`);
  } else {
    msg.reply(`Are you sure (${extra[1]}) is a valid module discriminator?`);
  }
});

commands.register(this.command, '', 'Get a list of module discriminators', (msg) => {
  const modules = loader.getModules();
  const em = new discord.RichEmbed();
  em.title = "Modules";
  modules.forEach(m => {
    em.addField(`Name: ${m.name}`, `Discriminator: ${m.discrim || 'none'}`);
  });
  msg.reply(em);
});

exports.name = 'Module Loader';
exports.state = true;
