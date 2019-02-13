const { Server, Permission } = require('@bot').database;

module.exports.checkPermissions = async (serverID, roleID, plugin) => {
  const server = await Server.findOne({ serverID }).exec();
  const rolePermissions = await Permission.find({
    server,
    roleID,
    plugin,
  });

  if (rolePermissions) {
    console.log('Has Permission');
  }
};

module.exports.addPermission = async (serverID, roleID, plugin) => {
  const server = await Server.findOne({ serverID }).exec();
  Permission.create({
    server,
    roleID,
    plugin,
  }, (err, permission) => {
    if (err) throw err;
    return permission;
  });
  return false;
};
