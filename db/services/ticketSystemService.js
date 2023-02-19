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
  const ticketSystem = await TicketSystem.find({ serverId }, '-_id -__v')
  return ticketSystem
}

const deleteTicketSystemByServerId = async ({
  serverId,
  channelId,
  forumCategoryId
}) => {
  const ticketSystem = await TicketSystem.findOneAndRemove({
    serverId,
    channelId,
    forumCategoryId
  })
  return ticketSystem
}

const deleteAllTicketSystemsByServerId = async (serverId) => {
  const ticketSystems = await TicketSystem.deleteMany({ serverId })
  return ticketSystems
}

module.exports = {
  getTicketSystemByServerId,
  createTicketSystem,
  deleteTicketSystemByServerId,
  deleteAllTicketSystemsByServerId
}
