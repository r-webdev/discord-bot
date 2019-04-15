const { commands } = require('@bot');
const { client } = require('@bot').client;
const { generator } = require('ngram-natural-language-generator');
const fs = require('fs');
const path = require('path');

exports.command = 'ngl';

client.on('message', async (msg) => {
  fs.appendFile(path.join(__dirname, 'ngl.txt'), `${msg}\n`, (err) => {
    if (err) throw err;
  });
});

commands.register(this.command, '', '', '', async (msg) => {
  try {
    generator({
      filename: path.join(__dirname, 'ngl.txt'),
      model: {
        maxLength: 100,
        minLength: 50,
      },
    }, (err, sentence) => {
      msg.channel.send(sentence);
    });
  } catch (error) {
    console.log(error);
  }
});

exports.name = 'Naturl Language Generator';
exports.version = '1.0.0';
exports.description = 'Generate Language';
exports.discrim = 'ngl';
exports.state = true;
exports.toggle = () => {
  this.state = !this.state;
};
