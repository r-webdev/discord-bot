const commands = require('../core/commands');
const { discord } = require('../core/client');
const LOADER = require('../core/module-loader');

exports.command = 'help';

commands.register(this.command, '', 'Shows the help message', (msg) => {
  const modules = LOADER.getModules();
  const em = new discord.RichEmbed();
  modules.forEach(m => {
    if (m.discrim) {
      em.addField(`${commands.getPrefix()}${this.command} ${m.discrim}`, `Displays help for ${m.name}`);
    }
  });
  msg.reply(em);
});

commands.register(this.command, '(.*)', 'Shows the help message', (msg, extra) => {
  msg.channel.send(LOADER.getModuleHelp(extra[1]));
});

exports.name = 'Help';
exports.state = true;
