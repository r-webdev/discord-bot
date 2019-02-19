const { commands } = require('@bot');
const { discord } = require('@bot').client;
const { User, Server, UserWarning } = require('@bot').database;

exports.command = 'warn';

commands.register(this.command, '', 'warn', 'Warning Help', async (msg) => {
  const pluginCommands = commands.getCommands('warn');
  const em = new discord.RichEmbed();
  const prefix = await commands.getPrefix();
  em.setTitle('Warnings | Help');
  pluginCommands.forEach((c) => {
    em.addField(`${prefix}${c.usage}`, `${c.description}`);
  });
  msg.channel.send(em);
});

/*
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  warning: String,
  warner: Number,
*/

commands.register(this.command, '([^\\s]+) (.*)', 'warn <@user> <reason>', 'Warn a user for something', async (msg, extra) => {
  const serverID = msg.guild.id;
  const server = await Server.findOne({ serverID }).exec();
  const warnedUser = msg.mentions.users.first();
  const warning = extra[2];
  const warner = msg.author.id;
  if (server && warnedUser) {
    const user = await User.findOne({ server, discrim: warnedUser.id });
    if (!user) {
      const newUser = await User.create({ server, discrim: warnedUser.id });
      UserWarning.create({ user: newUser, warning, warner }, (warningError) => {
        if (warningError) throw warningError;
        msg.channel.send(`Warned {${extra[1]}} for {${extra[2]}}`);
        return warnedUser.send(`You have been warned for {${extra[2]}}`);
      });
    } else {
      UserWarning.create({ user, warning, warner }, (warningError) => {
        if (warningError) throw warningError;
        msg.channel.send(`Warned {${extra[1]}} for {${extra[2]}}`);
        return warnedUser.send(`You have been warned for {${extra[2]}}`);
      });
    }
  } else {
    return msg.reply('Cannot warn, error?');
  }
  return false;
});

commands.register(this.command, 'list (.*)', 'warn list <@user>', 'List a users warnings', async (msg) => {
  const serverID = msg.guild.id;
  const server = await Server.findOne({ serverID }).exec();
  if (server) {
    const targetUser = msg.mentions.users.first();
    const user = await User.findOne({ server, discrim: targetUser.id }).exec();
    const warnings = await UserWarning.find({ user }).exec();
    if (warnings) {
      const em = new discord.RichEmbed();
      em.setTitle(`${targetUser.username}'s | Warnings`);
      warnings.forEach(w => em.addField(w.warning, `Issuer: ${msg.guild.members.find(u => u.id === w.warner)}`));
      em.setFooter(`Total Warnings: ${warnings.length}`);
      return msg.channel.send(em);
    }
    return msg.channel.send('Nothing for that user');
  }
  return msg.channel.send('Nothing for that user');
});

exports.name = 'Warnings';
exports.version = '1.0.0';
exports.description = 'Warnings Plugin';
exports.discrim = 'warn';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
