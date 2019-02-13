const { commands, loader, permissions } = require('@bot');
const { discord } = require('@bot').client;

exports.command = 'permissions';

commands.register(this.command, 'add (.*) (.*)', 'permissions add <plugin-discriminator> <@role>', 'Add permission to a plugin to a role', async (msg, extra) => {
  const plugin = loader.getPlugin(extra[1]);
  if (plugin) {
    const role = msg.mentions.roles.first();
    if (role) {
      await permissions.addPermission(msg.guild.id, role.id, extra[1]);
      return msg.reply(`Added use permissions to ${role}`);
    }
    return msg.reply('Error, must {@} a role..');
  }
  return msg.reply('Error plugin does not exist..');
});

commands.register(this.command, '', 'permissions', 'Permissions help', async (msg) => {
  const pluginCommands = commands.getCommands('permissions');
  const em = new discord.RichEmbed();
  const prefix = await commands.getPrefix();
  em.setTitle('Customize | Help');
  pluginCommands.forEach((c) => {
    em.addField(`${prefix}${c.command} \`${c.params}\``, `${c.description}`);
  });
  msg.channel.send(em);
});

exports.name = 'Permission Helper';
exports.discrim = 'permissions';
exports.state = true;
