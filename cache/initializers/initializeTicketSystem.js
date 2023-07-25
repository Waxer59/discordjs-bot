const {
  getTicketSystemByServerId,
  deleteTicketSystemByServerId
} = require('../../db/services/ticketSystemService')
const { setValue } = require('../client')
const { TICKET_CHANNEL } = require('../types/cacheTypes')

const initializeTicketSystem = async (client, serverId) => {
  const content = await getTicketSystemByServerId(serverId)

  if (content.length <= 0) {
    return
  }
  for (const { channelId, forumCategoryId } of content) {
    const channel = client.channels.cache.get(channelId)
    const category = client.channels.cache.get(forumCategoryId)
    if (!channel || !category) {
      if (channel) {
        channel.delete()
      }
      if (category) {
        category.delete()
      }
      deleteTicketSystemByServerId({ serverId, channelId, forumCategoryId })
      return
    }
    await setValue(`${TICKET_CHANNEL}:${serverId}-${channelId}`, {
      serverId,
      channelId,
      forumCategoryId
    })
  }
}

module.exports = {
  initializeTicketSystem
}
