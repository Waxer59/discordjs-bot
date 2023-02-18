const {
  getTicketSystemByServerId,
  deleteTicketSystemByServerId
} = require('../../db/services/ticketSystemService')
const { createContextParam } = require('../manageContext')
const { contextTypes } = require('../types/contextTypes')

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
  }
  createContextParam(
    `${serverId}`,
    {
      [contextTypes().TICKET_CHANNEL]: content
    },
    {
      override: true
    }
  )
}

module.exports = {
  initializeTicketSystem
}
