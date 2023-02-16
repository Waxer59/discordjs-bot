const {
  getTicketSystemByServerId,
  deleteTicketSystemByServerId
} = require('../../db/services/ticketSystemService')
const { createContextParam } = require('../manageContext')
const { contextTypes } = require('../types/contextTypes')

const initializeTicketSystem = async (client, id) => {
  const content = await getTicketSystemByServerId(id)
  if (content.length <= 0) {
    return
  }
  const { channelId, serverId, controlsMessageId, forumCategoryId } = content[0]
  const channel = client.channels.cache.get(channelId)
  const category = client.channels.cache.get(forumCategoryId)
  if (!channel || !category) {
    if (channel) {
      channel.delete()
    }
    if (category) {
      category.delete()
    }
    deleteTicketSystemByServerId(id)
    return
  }
  createContextParam(
    `${serverId}`,
    {
      [contextTypes().TICKET_CHANNEL]: {
        channelId,
        serverId,
        forumCategoryId,
        controlsMessage: await channel.messages.fetch(controlsMessageId)
      }
    },
    {
      override: true
    }
  )
}

module.exports = {
  initializeTicketSystem
}
