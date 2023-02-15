const { Schema, model } = require('mongoose')

const MemberChannelCounterSchema = new Schema({
  channelId: {
    type: String,
    required: [true, 'The channel id is required']
  }
})

module.exports = model('memberChanelCounter', MemberChannelCounterSchema)
