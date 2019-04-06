const { commands } = require('@bot');
const { discord } = require('@bot').client;
const { JoinableRole, Server } = require('@bot').database;

exports.command = 'mod';

commands.register(this.command, '', 'mod', 'User Management Help', async (msg) => {
  const pluginCommands = commands.getCommands('mod');
  const em = new discord.RichEmbed();
  const prefix = await commands.getPrefix();
  em.setTitle('Mod | Help');
  pluginCommands.forEach((c) => {
    em.addField(`${prefix}${c.usage}`, `${c.description}`);
  });
  msg.channel.send(em);
});

commands.register(this.command, 'info (.*)', 'mod info <@user>', 'Get a users information', (msg) => {
  const em = new discord.RichEmbed();
  const user = msg.mentions.users.first();
  em.setTitle(`User Information for [${user.username}]`);
  em.setThumbnail(user.displayAvatarURL);
  em.addField('User ID', user.id);
  em.addField('Joined At', user.createdAt);
  msg.reply(em);
});

commands.register(this.command, 'addrole (.*)', 'mod addrole <rank>', 'Add a rank to joinable list', async (msg, extra) => {
  const serverID = msg.guild.id;
  const server = await Server.findOne({ serverID }).exec();
  const role = extra[1];
  const roles = msg.guild.roles.array();
  console.log(roles.length);

  for (var i = 0; i < roles.length; i++) {
    if (roles[i]['name'] == role) {
      roleId = roles[i]['id'];
      const joinable = await JoinableRole.find({
        server,
        roleId,
      }).exec();
      if (joinable.length == 0) {
        const joinableRole = await JoinableRole.create({ server, roleId });
        if (joinableRole) {
          msg.reply(`Added joinable role  "${role}"`);
        }
        else {
          msg.reply(`Could not add "${role}" as a joinable role.`);
        }
      }
    }
  }
});


exports.name = 'User-Management';
exports.version = '1.0.0';
exports.description = 'Basic User Management Plugin';
exports.discrim = 'usermanagement';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
