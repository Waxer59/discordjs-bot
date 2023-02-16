const TicketSystem = require('../models/ticketSystemModel')

const createTicketSystem = async ({
  serverId,
  channelId,
  controlsMessageId,
  forumCategoryId
}) => {
  const ticketSystem = new TicketSystem({
    serverId,
    channelId,
    controlsMessageId,
    forumCategoryId
  })

  await ticketSystem.save()
  return ticketSystem
}

const getTicketSystemByServerId = async (serverId) => {
  const ticketSystem = await TicketSystem.find({ serverId })
  return ticketSystem
}

const deleteTicketSystemByServerId = async (serverId) => {
  const ticketSystem = await TicketSystem.findOneAndRemove({ serverId })
  return ticketSystem
}

module.exports = {
  getTicketSystemByServerId,
  createTicketSystem,
  deleteTicketSystemByServerId
}
