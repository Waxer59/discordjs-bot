const TicketChannel = require('../models/ticketChannelModel');

const createTicketChannel = async ({
  serverId,
  channelId,
  controlsMessageId
}) => {
  const ticketChannel = new TicketChannel({
    serverId,
    channelId,
    controlsMessageId
  });

  await ticketChannel.save();
  return ticketChannel;
};

const getTicketChannelByServerId = async (serverId) => {
  const ticketChannel = await TicketChannel.find({ serverId });
  return ticketChannel;
};

const deleteTicketChannelByServerId = async (serverId) => {
  const ticketChannel = await TicketChannel.findOneAndRemove({ serverId });
  return ticketChannel;
};

module.exports = {
  getTicketChannelByServerId,
  createTicketChannel,
  deleteTicketChannelByServerId
};
