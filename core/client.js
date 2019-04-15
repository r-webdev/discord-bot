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
  try {
    const t = await client.login(key);
    if (t !== key) {
      log('Notify', 'Trying To Recover');
      await sleep(500);
      await tryLogin();
    }
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      log('Notify', 'Trying To Recover');
      await sleep(500);
      await tryLogin();
    }
  }
};

client.on('error', (error) => {
  if (error.message === 'read ECONNRESET' || error.message === 'getaddrinfo ENOTFOUND') {
    tryLogin();
  }
});

tryLogin();

module.exports.discord = Discord;
module.exports.client = client;
