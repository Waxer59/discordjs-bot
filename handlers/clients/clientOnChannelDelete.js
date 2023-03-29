const { Events, ChannelType } = require('discord.js')
const { getContextParam } = require('../../context/manageContext')
const {
  MUSIC_CHANNEL,
  TICKET_CHANNEL
} = require('../../context/types/contextTypes')
const {
  handleMusicChannelDelete
} = require('../commands/musicSystem/handleMusicSystem')
const {
  handleTicketSystemDelete
} = require('../commands/ticketSystem/handleTicketSystem')

const clientOnChannelDelete = (client) => {
  client.on(Events.ChannelDelete, async (channel) => {
    const channelId = channel.id
    const serverId = channel.guild.id
    const deletedTicketSystem = getContextParam(`${serverId}`)?.[
      TICKET_CHANNEL
    ]?.find((el) =>
      channel.type === ChannelType.GuildText
        ? el.channelId
        : el.forumCategoryId === channelId
    )
    switch (channelId) {
      case getContextParam(`${serverId}`)?.[MUSIC_CHANNEL]?.channelId:
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
