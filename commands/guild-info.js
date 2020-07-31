module.exports = {
  name: 'guild-info',
  description: 'show guild info',
  execute(message, args) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  },
};
