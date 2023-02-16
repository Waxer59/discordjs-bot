const { Schema, model } = require('mongoose')

const MemberCounterChannelSchema = new Schema({
  channelId: {
    type: String,
    required: [true, 'The channel id is required']
  }
})

module.exports = model('memberChanelCounter', MemberCounterChannelSchema)
