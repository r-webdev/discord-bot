const core = require('@bot');

const logger = require('./logger');

core.hook('logger', logger);

const utils = require('./utils');

core.hook('utils', utils);

const client = require('./client');

core.hook('client', client);

const loader = require('./plugin-loader');

core.hook('loader', loader);

const database = require('./database');

core.hook('database', database);

const permissions = require('./permissions');

core.hook('permissions', permissions);

const commands = require('./commands');

core.hook('commands', commands);
