const { getEnvVariables } = require('../environment/envVariables')
const {
  clientOnMessageCreate,
  clientOnVoiceStateUpdate,
  clientOnChannelDelete,
  clientOnInteractionCreate,
  clientOnReady,
  clientOnGuildMemberRemove,
  clientOnGuildMemberAdd,
  clientOnGuildDelete,
  clientOnMessageDelete
} = require('./clients')

const handleClientEvents = (client) => {
  clientOnMessageCreate(client)

  clientOnVoiceStateUpdate(client)

  clientOnChannelDelete(client)

  clientOnInteractionCreate(client)

  clientOnReady(client)

  clientOnGuildMemberAdd(client)

  clientOnGuildMemberRemove(client)

  clientOnGuildDelete(client)

  clientOnMessageDelete(client)

  client.login(getEnvVariables().DISCORD_TOKEN)
}

module.exports = {
  handleClientEvents
}
