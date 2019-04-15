// Load configuration.
require('dotenv').config();

// load @bot hooks.
require('./core/bootstrap');

// Load HTTP server for redirecting to auth URL.
const http = require('http');

const { loader } = require('@bot');
const { log } = require('@bot').logger;

loader.init();

// Simple HTTP server to redirect to Discord bot auth URL.
const { PORT } = process.env;
const server = http.createServer((request, response) => {
  response.writeHead(302, { Location: process.env.DISCORD_REDIRECT_URL });
  response.end('Redirecting...');
});
server.listen(PORT, log('notify', `Port: {${PORT}}`));
