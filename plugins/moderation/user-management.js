const { commands } = require('@bot');
const { discord } = require('@bot').client;

exports.command = 'mod';

commands.register(this.command, '', 'Customize Help', (msg) => {
  msg.reply('Customize the bot with other commands!');
});

commands.register(this.command, 'info (.*)', 'Customize Help', (msg) => {
  const em = new discord.RichEmbed();
  const user = msg.mentions.users.first();
  em.setTitle(`User Information for [${user.username}]`);
  em.setThumbnail(user.displayAvatarURL);
  em.addField('User ID', user.id);
  em.addField('Joined At', user.createdAt);
  msg.reply(em);
});

exports.name = 'User-Management';
exports.version = '1.0.0';
exports.description = 'Basic User Management Plugin';
exports.discrim = 'usermanagement';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
