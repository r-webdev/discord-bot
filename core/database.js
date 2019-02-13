const { log } = require('@bot').logger;
const mongoose = require('mongoose');

const [Schema] = mongoose.Schema;
const database = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

database.on('error', console.error.bind(console, 'connection error:'));

database.once('open', () => {
  log('notify', 'MongoDB Connected');
});

const Server = mongoose.model('Server', {
  serverID: Number,
});

const User = mongoose.model('User', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  descrim: Number,
});

const UserWarning = mongoose.model('UserWarnings', {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  warning: String,
  warner: Number,
});

const Configuration = mongoose.model('Configuration', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  prefix: String,
  adminRole: Number,
});

const ModeratorRole = mongoose.model('ModeratorRole', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  roleID: Number,
});

const Permission = mongoose.model('Permission', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  module: String,
  roleID: Number,
  permission: String,
});

module.exports = {
  Server,
  User,
  UserWarning,
  Permission,
  Configuration,
  ModeratorRole,
  database,
};
