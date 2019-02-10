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
  serverID: Number
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
  adminRole: Number
});

module.exports = {
  Server, User, Configuration, database
};