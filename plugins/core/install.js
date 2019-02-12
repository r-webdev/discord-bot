const { commands, loader } = require('@bot');
const { client, discord } = require('@bot').client;
const { Server, Configuration } = require('@bot').database;

exports.command = 'setup';

const roleReducer = (lastRole, curRole) => lastRole.permissions < curRole.permissions ? curRole : lastRole;

client.on('guildCreate', async (guild) => {
  const serverID = guild.id;
  const server = await Server.findOne({ serverID }).exec();
  const highestRole = guild.roles.array().reduce(roleReducer);
  const adminRole = highestRole.id;
  if (!server) {
    Server.create({ serverID }, (err, server) => {
      Configuration.create({ server, prefix: '!', adminRole }, (err, config) => {
        if (err) return console.log(err);
      });
    });
  }
});

exports.name = 'Setup';
exports.state = true;
