const { getEnvVariables } = require('../environment/envVariables')
const {
  clientOnMessageCreate,
  clientOnVoiceStateUpdate,
  clientOnChannelDelete,
  clientOnInteractionCreate,
  clientOnReady,
  clientOnGuildMemberRemove,
  clientOnGuildMemberAdd,
  clientOnGuildDelete
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

  client.login(getEnvVariables().DISCORD_TOKEN)
}

module.exports = {
  handleClientEvents
}
