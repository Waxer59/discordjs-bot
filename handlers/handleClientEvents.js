const { getEnvVariables } = require('../environment/envVariables');
const {
  clientOnMessageCreate,
  clientOnVoiceStateUpdate,
  clientOnChannelDelete,
  clientOnInteractionCreate,
  clientOnReady
} = require('./clients');

const handleClientEvents = (client) => {
  clientOnMessageCreate(client);

  clientOnVoiceStateUpdate(client);

  clientOnChannelDelete(client);

  clientOnInteractionCreate(client);

  clientOnReady(client);

  client.login(getEnvVariables().DISCORD_TOKEN);
};

module.exports = {
  handleClientEvents
};
