// Load configuration.
require('dotenv').config();
const LOADER = require('./core/module-loader');
const logger = require('./core/logger');

LOADER.loadModules();
logger.log('store', 'Bot Started', new Date());
