/* eslint-disable global-require */
// require the discord.js module
const Discord = require('discord.js');

// add Node's native file system module
const fs = require('fs');
// add config data
const { prefix, token } = require('./config.json');
// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// fs.readdirSync() method will return an array of all the file names in that directory
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  client.commands.set(command.name, command);
});

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
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// login to Discord with your app's token
client.login(token);
