const { commands } = require('@bot');
const { Server, JoinableRole } = require('@bot').database;

exports.command = 'role';

commands.register(this.command, 'join (.*)', 'role join <role>', 'Join an enabled role', async (msg, extra) => {
  const serverID = msg.guild.id;
  const server = await Server.findOne({ serverID }).exec();

  const role = extra[1];
  const roles = msg.guild.roles.array();
  for (var i = 0; i < roles.length; i++) {
    if (roles[i]['name'] == role) {
      roleId = roles[i]['id'];
      const joinable = await JoinableRole.find({
        server,
        roleId,
      }).exec();
      const user = msg.member;
      if (joinable) {
        user.addRole(roleId);
        msg.reply(`Assigned role "${role}"`);
      }
    }
  }
});

commands.register(this.command, 'leave (.*)', 'role leave <role>', 'Leave a role', (msg, extra) => {
  const userRoles = msg.member.roles.array();
  const role = extra[1];
  const roles = msg.guild.roles.array();
  for (var i = 0; i < roles.length; i++) {
    if (roles[i]['name'] == role) {
      const user = msg.member;
      user.removeRole(roles[i]['id']);
      msg.reply(`Removed role "${role}"`);
    }
  }
});

exports.name = 'Role';
exports.version = '1.0.0';
exports.description = 'Attatch or remove a role from a user';
exports.discrim = 'role';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
