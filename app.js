// require the discord.js module
const Discord = require('discord.js');

// add config data
const { prefix, token } = require('./config.json');
// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  // If the message either doesn't start with the prefix or was sent by a bot, exit early.
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // remove prefix and convert the rest to be array
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  // remove command word from args by using .shift()
  const command = args.shift().toLowerCase();

  if (command === 'ohayou') {
    message.reply('おはようございます～');
  } else if (command === 'guild-info') {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  } else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: <${message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
        })}>`
      );
    }
    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({
        format: 'png',
        dynamic: true,
      })}>`;
    });
    message.channel.send(avatarList);
  }
});

// login to Discord with your app's token
client.login(token);
