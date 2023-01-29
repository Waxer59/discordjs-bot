const { clientOnMessageCreate } = require('./clientOMessageCreate')
const { clientOnChannelDelete } = require('./clientOnChannelDelete')
const { clientOnInteractionCreate } = require('./clientOnInteractionCreate')
const { clientOnReady } = require('./clientOnReady')
const { clientOnVoiceStateUpdate } = require('./clientOnVoiceStateUpdate')

module.exports = {
  clientOnMessageCreate,
  clientOnChannelDelete,
  clientOnInteractionCreate,
  clientOnReady,
  clientOnVoiceStateUpdate
}
