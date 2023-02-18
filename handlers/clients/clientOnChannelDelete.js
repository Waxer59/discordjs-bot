const { Events, ChannelType } = require('discord.js')
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
    const deletedTicketSystem = getContextParam(`${serverId}`)?.[
      contextTypes().TICKET_CHANNEL
    ]?.find((el) =>
      channel.type === ChannelType.GuildText
        ? el.channelId
        : el.forumCategoryId === channelId
    )
    switch (channelId) {
      case getContextParam(`${serverId}`)?.[contextTypes().MUSIC_CHANNEL]
        ?.channelId:
        handleMusicChannelDelete(serverId)
        break
      case deletedTicketSystem?.forumCategoryId:
      case deletedTicketSystem?.channelId:
        handleTicketSystemDelete(client, serverId, channel)
        break
    }
  })
}

module.exports = {
  clientOnChannelDelete
}
