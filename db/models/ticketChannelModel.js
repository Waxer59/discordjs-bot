const { Schema, model } = require('mongoose');

const TicketChannelSchema = new Schema({
  serverId: {
    type: String,
    required: [true, 'The server id is required']
  },
  channelId: {
    type: String,
    required: [true, 'The channel id is required']
  },
  controlsMessageId: {
    type: String,
    required: [true, 'The controls message is required']
  }
});

module.exports = model('ticket-channel', TicketChannelSchema);
