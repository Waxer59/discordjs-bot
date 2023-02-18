const { Schema, model } = require('mongoose')

const TicketSystemSchema = new Schema({
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
  },
  forumCategoryId: {
    type: String,
    required: [true, 'The forum category id is required']
  }
})

module.exports = model('ticketSystem', TicketSystemSchema)
