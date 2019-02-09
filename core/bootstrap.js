const core = require('@bot');

const logger = require('./logger');
core.hook('logger', logger);

const client = require('./client');
core.hook('client', client);

const loader = require('./module-loader');
core.hook('loader', loader);

const commands = require('./commands');
core.hook('commands', commands);

const database = require('./database');
core.hook('database', database);
