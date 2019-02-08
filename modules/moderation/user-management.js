const commands = require('../../core/commands');
const discord = require('../../core/client');

commands.register('mod', '', 'Customize Help', (msg) => {
  msg.reply('Customize the bot with other commands!');
});

commands.register('mod', 'info (.*)', 'Customize Help', (msg, extra) => {
  const em = new discord.discord.RichEmbed();
  const user = msg.mentions.users.first();
  em.setTitle(`User Information for [${user.username}]`);
  em.setThumbnail(user.displayAvatarURL)
  em.addField("User ID", user.id);
  em.addField("Joined At", user.createdAt);
  msg.reply(em);
});

console.log(`Loaded Moderation, user-management Module`);
