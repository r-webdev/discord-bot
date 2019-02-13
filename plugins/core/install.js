const { client } = require('@bot').client;
const { Server, Configuration, Permission } = require('@bot').database;

exports.command = 'setup';

// eslint-disable-next-line arrow-body-style
const roleReducer = (lastRole, curRole) => {
  return lastRole.permissions < curRole.permissions ? curRole : lastRole;
};

client.on('guildCreate', async (guild) => {
  const serverID = guild.id;
  const server = await Server.findOne({ serverID }).exec();
  const highestRole = guild.roles.array().reduce(roleReducer);
  const adminRole = highestRole.id;
  if (!server) {
    Server.create({ serverID }, (serverError, newServer) => {
      if (serverError) throw serverError;
      Configuration.create({ server: newServer, prefix: '!', adminRole }, (configError) => {
        if (configError) throw configError;
      });
      Permission.create({ server: newServer, roleID: adminRole, plugin: 'plugins' }, (configError) => {
        if (configError) throw configError;
      });
      Permission.create({ server: newServer, roleID: adminRole, plugin: 'permissions' }, (configError) => {
        if (configError) throw configError;
      });
    });
  }
});

exports.name = 'Setup';
exports.state = true;
