// Load configuration.
require('dotenv').config();

//load @bot hooks
require('./core/bootstrap');

const { loader } = require('@bot');
const { log } = require('@bot').logger;

log('notify', `BOTKEY: [${process.env.DISCORD_KEY}]`);
log('notify', `MONGO: [${process.env.MONGODB_URL}]`);

loader.init();
