const { Events } = require('discord.js');
const {
  handleBotDisconnection
} = require('../musicCommand/handleMusicChannels');

const clientOnVoiceStateUpdate = (client) => {
  client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    if (oldState.channelId === newState.chanelId)
      return console.log('Mute/Deafen Update');

    if (!oldState.channelId && newState.channelId)
      return console.log('Connection Update');

    if (oldState.channelId && !newState.channelId) {
      handleBotDisconnection(client, newState);
    }
  });
};

module.exports = {
  clientOnVoiceStateUpdate
};
