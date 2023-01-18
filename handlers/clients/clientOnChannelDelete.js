const { Events } = require('discord.js')
const {
  getContextParam,
  removeContextParam
} = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')

const clientOnChannelDelete = (client) => {
  client.on(Events.ChannelDelete, async (channel) => {
    const channelId = channel.id
    //* MUSIC_CHANNELS DELETE LOGIC
    if (
      getContextParam(contextTypes().MUSIC_CHANNELS)?.channelId === channelId
    ) {
      removeContextParam(contextTypes().MUSIC_CHANNELS)
    }
  })
}

module.exports = {
  clientOnChannelDelete
}
