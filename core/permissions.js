const { Server, Permission } = require('@bot').database;

module.exports.checkPermissions = async (serverID, roleID, plugin) => {
  const server = await Server.findOne({ serverID }).exec();
  const rolePermissions = await Permission.findOne({
    server,
    roleID,
    plugin,
  }).exec();
  if (rolePermissions) return true;
  return false;
};

module.exports.getServerPermissions = async (serverID) => {
  const server = await Server.findOne({ serverID }).exec();
  const serverPermissions = await Permission.find({ server }).exec();
  return serverPermissions;
};

module.exports.addPermission = async (serverID, roleID, plugin) => {
  const server = await Server.findOne({ serverID }).exec();
  const permissionExists = await Permission.findOne({ server, roleID, plugin }).exec();
  if (permissionExists) {
    return false;
  }
  const permission = await Permission.create({ server, roleID, plugin });
  if (permission) return true;
  return false;
};
