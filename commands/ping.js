module.exports = {
  name: 'ping',
  description: 'reply ping',
  execute(message, args) {
    message.channel.send('Pong.');
  },
};
