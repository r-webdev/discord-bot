const Discord = require('discord.js');
const { log } = require('@bot').logger;
const { sleep } = require('@bot').utils;

const client = new Discord.Client();

const key = process.env.DISCORD_KEY;

client.on('ready', () => {
  client.user.setActivity('Web Development');
  log('notify', 'Bot Started');
});

const tryLogin = async () => {
  const loginState = await client.login(key).catch(() => tryLogin());
  if (loginState !== key) {
    log('Notify', 'Trying To Recover');
    await sleep(500);
    await tryLogin();
  }
};

client.on('error', (error) => {
  if (error.message === 'read ECONNRESET' || error.message === 'getaddrinfo ENOTFOUND') {
    client.destroy();
    tryLogin();
  }
});

tryLogin();

module.exports.discord = Discord;
module.exports.client = client;
