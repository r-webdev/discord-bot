const { commands, loader } = require('@bot');
const { client, discord } = require('@bot').client;
const { Server, Configuration } = require('@bot').database;

exports.command = 'install';

commands.register(this.command, '', 'Testing Install', async (msg) => {
  const serverID = msg.guild.id;
  const server = await Server.findOne({ serverID }).exec();
  let setupStep = 0;
  if (!server) {
    Server.create({ serverID }, function (err, server) {
      if (err) return console.log(err);
      const configuration = {};
      configuration.server = server;
      msg.reply('Install Process Started, please respond with a command prefix EX: "!"');
      const collector = new discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
      setupStep += 1;
      collector.on('collect', msg => {
        if (setupStep === 1) {
          configuration.prefix = msg.content;
          msg.reply(`Server command prefix set to {${msg.content}}, please reply with an {@admin} role to mark as bot admins`);
          setupStep += 1;
          return true;
        }
        if (setupStep === 2) {
          let adminRole = msg.mentions.roles.first();
          configuration.adminRole = adminRole.id;
          msg.reply(`Server admin role set to ${adminRole}`);
          Configuration.create(configuration, (err, Config) => {
            if (err) return console.log(err);
            msg.reply('Setup Complete');
          });
        }
      })
    });
  } else {
    msg.reply('This server is already setup. ');
  }
});

exports.name = 'Installer';
exports.state = true;
