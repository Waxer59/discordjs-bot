const { Events } = require('discord.js')
const { getContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const {
  handleMusicChannelDelete
} = require('../commands/musicCommand/handleMusicChannels')
const {
  handleTicketSystemDelete
} = require('../commands/ticketSystem/handleTicketSystemChannels')

const clientOnChannelDelete = (client) => {
  client.on(Events.ChannelDelete, async (channel) => {
    const channelId = channel.id
    const serverId = channel.guild.id

    switch (channelId) {
      case getContextParam(`${channel.guildId}`)?.[contextTypes().MUSIC_CHANNEL]
        ?.channelId:
        handleMusicChannelDelete(serverId)
        break
      case getContextParam(`${channel.guildId}`)?.[
        contextTypes().TICKET_CHANNEL
      ]?.forumCategoryId:
      case getContextParam(`${channel.guildId}`)?.[
        contextTypes().TICKET_CHANNEL
      ]?.channelId:
        handleTicketSystemDelete(client, serverId, channel)
        break
    }
  })
}

module.exports = {
  clientOnChannelDelete
}
