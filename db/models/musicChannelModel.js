const { Schema, model } = require('mongoose')

const MusicChannelSchema = new Schema({
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
})

module.exports = model('music-channel', MusicChannelSchema)
