# Webster the Web Bot

<img src="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_03gmzdso8rm01.png" alt="webdev logo" align="right">

Community-made bot for the [/r/webdev+web_design Discord](https://discordapp.com/invite/keD8rZp), aimed to merge a handful of bots into one.

## Getting Started

This bot is done in Node.js with a MongoDB database backing it. Ensure you have a MongoDB database to use as a testing ground like [mLab](https://mlab.com/).

Copy the .env.example file to .env and fill out the details, including a key to use for Discord (https://discordapp.com/developers/applications/) and
the location of your MongoDB instance. Then run the following:

```bash
npm install
npm start
```

Once the bot is started up, [follow these instructions](https://discordapp.com/developers/docs/topics/oauth2#bots) to invite him to your server. 

## Official Plugins

Thanks to initial work by Papaya, adding new commands is done via plugins in the `plugins/` directory. For a good example, check out `plugins/ping-pong.js`. 

| Plugin name   | File name       | About                                           |
|---------------|-----------------|-------------------------------------------------|
| Customize     | customize.js    | Customizes the bot, e.g prefix or "now playing" |       
| Help          | help.js         | Displays help messages                          |
| Plugin Helper | plugin-helper.js | Toggle or view status of various plugins       |
| Ping Pong     | ping-pong.js    | Responds to !ping with PONG                     |
