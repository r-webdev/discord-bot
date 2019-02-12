// Load configuration.
require('dotenv').config();

//load @bot hooks.
require('./core/bootstrap');

// Load HTTP server for redirecting to auth URL.
const http = require('http');

const { loader } = require('@bot');
const { log } = require('@bot').logger;

log('notify', `BOTKEY: [${process.env.DISCORD_KEY}]`);
log('notify', `MONGO: [${process.env.MONGODB_URL}]`);

loader.init();

const PORT = process.env.PORT;
const server = http.createServer((request, response) => {
	response.writeHead(302, {"Location": process.env.DISCORD_REDIRECT_URL});
	response.end("Redirecting...");
});
server.listen(PORT, () => console.log("Server is listening on port %s", PORT));
