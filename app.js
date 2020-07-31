const Discord = require('discord.js');

const fs = require('fs');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// fs.readdirSync() method will return an array of all the file names in commands directory
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  // set a new item in the command Collection
  client.commands.set(command.name, command);
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  // If the message either doesn't start with the prefix or was sent by a bot, exit early.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // example message: "momoko avatar @MomoBot @Mugi"
  // prefix   = "momoko"
  // command  = "avatar"
  // args     = "@MomoBot @Mugi"

  // remove prefix and convert the rest to be array
  const args = message.content.slice(prefix.length).trim().split(/ +/);

  // remove command from args by using .shift()
  const command = args.shift().toLowerCase();

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// login to Discord with app's token
client.login(token);
