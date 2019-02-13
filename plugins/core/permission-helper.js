const { commands, loader, permissions } = require('@bot');

exports.command = 'permissions';

commands.register(this.command, 'add (.*) (.*)', 'Get a list of plugin discriminators', async (msg, extra) => {
  const plugin = loader.getPlugin(extra[1]);
  if (plugin) {
    const role = msg.mentions.roles.first();
    if (role) {
      const p = await permissions.addPermission(msg.guild.id, role.id, extra[1]);
      console.log(p);
    }
  }
});

exports.name = 'Permission Helper';
exports.state = true;
