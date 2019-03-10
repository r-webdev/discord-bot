const { commands } = require('@bot');
const { client, discord } = require('@bot').client;

exports.command = 'rank';

commands.register(this.command, 'join (.*)', 'rank join <rank>', 'Join an enabled rank', (msg, extra) => {
  const userRoles = msg.member.roles.array();
  const role = extra[1];
  const roles = msg.guild.roles.array();
  for (var i = 0; i < roles.length; i++) {
    if (roles[i]['name'] == role) {
      const user = msg.member;
      user.addRole(roles[i]['id']);
      msg.reply(`Assigned rank "${role}"`);
    }
  }
});

commands.register(this.command, 'leave (.*)', 'rank leave <rank>', 'Leave a rank', (msg, extra) => {
  const userRoles = msg.member.roles.array();
  const role = extra[1];
  const roles = msg.guild.roles.array();
  for (var i = 0; i < ranks.length; i++) {
    if (roles[i]['name'] == role) {
      const user = msg.member;
      user.removeRole(roles[i]['id']);
      msg.reply(`Removed role "${role}"`);
    }
  }
});

exports.name = 'Rank';
exports.version = '1.0.0';
exports.description = 'Attatch or remove a rank from a user';
exports.discrim = 'rank';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
