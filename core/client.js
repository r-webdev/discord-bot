const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Discord Ready");
});

client.login('NTQzMjc1NzYzOTQwNTg5NTg5.Dz6MsQ.8VPzmAK8t7-Ry-WX3Y5tcTEpeOw');

module.exports.discord = Discord;
module.exports.client = client;
