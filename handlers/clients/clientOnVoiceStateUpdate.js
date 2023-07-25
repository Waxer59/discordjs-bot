const { Events } = require('discord.js')
const {
  handleBotDisconnection
} = require('../commands/musicSystem/handleMusicSystem')
const { getValue } = require('../../cache/client')
const { MUSIC_CHANNEL } = require('../../cache/types/cacheTypes')

const clientOnVoiceStateUpdate = (client) => {
  client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    if (oldState.channelId === newState.chanelId) {
      return
    }

    if (!oldState.channelId && newState.channelId) {
      return
    }

    if (
      oldState.channelId &&
      !newState.channelId &&
      newState.id === newState.guild.members.me.id
    ) {
      const musicChannel = await getValue(
        `${MUSIC_CHANNEL}:${newState.guild.id}`
      )

      if (!musicChannel) {
        return
      }

      const channel = client.channels.cache.get(musicChannel?.channelId)
      const controlsMessage = await channel.messages.fetch(
        musicChannel?.controlsMessageId
      )
      await handleBotDisconnection(client, controlsMessage)
    }
  })
}

module.exports = {
  clientOnVoiceStateUpdate
}
