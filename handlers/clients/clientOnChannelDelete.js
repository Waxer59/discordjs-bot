const { Events } = require('discord.js')
const {
  handleMusicChannelDelete
} = require('../commands/musicSystem/handleMusicSystem')
const {
  handleTicketSystemDelete
} = require('../commands/ticketSystem/handleTicketSystem')
const { getValue } = require('../../cache/client')
const {
  TICKET_CHANNEL,
  MUSIC_CHANNEL
} = require('../../cache/types/cacheTypes')

const clientOnChannelDelete = (client) => {
  client.on(Events.ChannelDelete, async (channel) => {
    const channelId = channel.id
    const serverId = channel.guild.id

    const deletedTicketSystem = await getValue(
      `${TICKET_CHANNEL}:${serverId}-${channelId}`
    )
    const deletedMusicChannel = await getValue(`${MUSIC_CHANNEL}:${serverId}`)

    switch (channelId) {
      case deletedMusicChannel?.channelId:
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
