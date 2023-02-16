const { Schema, model } = require('mongoose')

const MemberCounterChannelSchema = new Schema({
  channelId: {
    type: String,
    required: [true, 'The channel id is required']
  },
  serverId: {
    type: String,
    required: [true, 'The server id is required']
  },
  channelName: {
    type: String,
    required: [true, 'The channel name is required']
  }
})

module.exports = model('memberChanelCounter', MemberCounterChannelSchema)
