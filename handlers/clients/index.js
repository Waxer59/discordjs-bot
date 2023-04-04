const { clientOnMessageCreate } = require('./clientOMessageCreate')
const { clientOnChannelDelete } = require('./clientOnChannelDelete')
const { clientOnInteractionCreate } = require('./clientOnInteractionCreate')
const { clientOnReady } = require('./clientOnReady')
const { clientOnVoiceStateUpdate } = require('./clientOnVoiceStateUpdate')
const { clientOnGuildMemberRemove } = require('./clienOnGuildMemberRemove')
const { clientOnGuildMemberAdd } = require('./clientOnGuildMemberAdd')
const { clientOnGuildDelete } = require('./clientOnGuildDelete')
const { clientOnMessageDelete } = require('./clientOnMessageDelete')

module.exports = {
  clientOnMessageCreate,
  clientOnChannelDelete,
  clientOnInteractionCreate,
  clientOnReady,
  clientOnVoiceStateUpdate,
  clientOnGuildMemberRemove,
  clientOnGuildMemberAdd,
  clientOnGuildDelete,
  clientOnMessageDelete
}
