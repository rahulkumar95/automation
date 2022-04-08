const debug = require('debug')('automation:Environment');
const config = require('./config.json');

const environment = process.env.NODE_ENV || 'default';
debug(environment);
const environmentConfig = config[environment];

global.gConfig = environmentConfig;
