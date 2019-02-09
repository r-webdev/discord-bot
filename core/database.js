const { log } = require('@bot').logger;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const database = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

database.on('error', console.error.bind(console, 'connection error:'));

database.once('open', function () {
  log('notify', 'MongoDB Connected');
});

const Server = mongoose.model('Server', {
  id: Number,
  name: String
});

const User = mongoose.model('User', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  name: String,
  descrim: Number,
  warnings: Number,
  isAdmin: Boolean
});

const Configuration = mongoose.model('Configuration', {
  server: { type: Schema.Types.ObjectId, ref: 'Server' },
  prefix: String,
  adminRole: String,
  help: String
});

module.exports = {
  server: Server,
  user: User,
  configuration: Configuration,
  database: database
};