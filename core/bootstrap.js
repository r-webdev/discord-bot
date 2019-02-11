const core = require('@bot');

const logger = require('./logger');
core.hook('logger', logger);

const client = require('./client');
core.hook('client', client);

const loader = require('./plugin-loader');
core.hook('loader', loader);

const database = require('./database');
core.hook('database', database);

const commands = require('./commands');
core.hook('commands', commands);
