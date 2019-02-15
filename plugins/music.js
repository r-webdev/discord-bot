const { commands } = require('@bot');
const { discord } = require('@bot').client;
const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');

const serverMusic = [];
/*
[
  serverID: {
    queue[
      {songName, songURL, requester},
    ],
  },
]
*/

const serverQueue = (serverID) => {
  if (serverMusic[serverID] === undefined) serverMusic[serverID] = { queue: [] };
  const { queue } = serverMusic[serverID];
  return queue;
};

exports.command = 'music';

commands.register(this.command, '', 'music', 'Get the music help', async (msg) => {
  const pluginCommands = commands.getCommands('music');
  const em = new discord.RichEmbed();
  const prefix = await commands.getPrefix();
  em.setTitle('Music | Help');
  pluginCommands.forEach((c) => {
    em.addField(`${prefix}${c.usage}`, `${c.description}`);
  });
  msg.channel.send(em);
});

commands.register(this.command, 'play (.*)', 'music play <song-name>/<youtube-url>', 'Change the bots game', async (msg, extra) => {
  const queue = serverQueue(msg.guild.id);

  if (msg.member.voiceChannel) {
    msg.member.voiceChannel.join().then((con) => {
      ytSearch(extra[1], (err, result) => {
        if (err) throw err;
        const [topResult] = result.videos;
        const { title, url, timestamp } = topResult;
        const requester = msg.author.username;
        const em = new discord.RichEmbed();
        em.setTitle(`Music | Added ${title}`);
        em.addField('Song Name', title);
        em.addField('Song Duration', timestamp);
        em.addField('Requester', requester);
        queue.push({ title, url, requester });
        const stream = ytdl(`http://www.youtube.com${url}`);
        con.playStream(stream);
        console.log(stream);
        msg.channel.send(em);
      });
    });
  }
});

exports.name = 'Music';
exports.version = '1.0.0';
exports.description = 'Music plugin';
exports.discrim = 'music';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
