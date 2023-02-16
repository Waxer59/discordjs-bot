const { getEnvVariables } = require('../environment/envVariables')
const {
  clientOnMessageCreate,
  clientOnVoiceStateUpdate,
  clientOnChannelDelete,
  clientOnInteractionCreate,
  clientOnReady
} = require('./clients')
const {
  clientOnGuildMemberRemove
} = require('./clients/clienOnGuildMemberRemove')
const { clientOnGuildMemberAdd } = require('./clients/clientOnGuildMemberAdd')

const handleClientEvents = (client) => {
  clientOnMessageCreate(client)

  clientOnVoiceStateUpdate(client)

  clientOnChannelDelete(client)

  clientOnInteractionCreate(client)

  clientOnReady(client)

  clientOnGuildMemberAdd(client)

  clientOnGuildMemberRemove(client)

  client.login(getEnvVariables().DISCORD_TOKEN)
}

module.exports = {
  handleClientEvents
}
