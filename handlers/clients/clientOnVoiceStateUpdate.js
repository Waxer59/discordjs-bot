const { Events } = require('discord.js')
const {
  handleBotDisconnection
} = require('../musicCommand/handleMusicChannels')

const clientOnVoiceStateUpdate = (client) => {
  client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    if (oldState.channelId === newState.chanelId) {
      return
    }

    if (!oldState.channelId && newState.channelId) {
      return
    }

    if (oldState.channelId && !newState.channelId) {
      handleBotDisconnection(client, newState)
    }
  })
}

module.exports = {
  clientOnVoiceStateUpdate
}
