const { Events } = require('discord.js')
const { getContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const {
  handleMusicChannelDelete
} = require('../musicCommand/handleMusicChannels')

const clientOnChannelDelete = (client) => {
  client.on(Events.ChannelDelete, async (channel) => {
    const channelId = channel.id
    if (
      getContextParam(`${channel.guildId}_${contextTypes().MUSIC_CHANNELS}`)
        ?.channelId === channelId
    ) {
      handleMusicChannelDelete(client, channel.guildId)
    }
  })
}

module.exports = {
  clientOnChannelDelete
}
