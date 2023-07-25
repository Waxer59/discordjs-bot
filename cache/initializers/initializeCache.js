const { initializeMusicChannels } = require('./initializeMusicChannels')
const { initializeTicketSystem } = require('./initializeTicketSystem')

const initializeCache = async (client, id) => {
  initializeMusicChannels(client, id)
  initializeTicketSystem(client, id)
}

module.exports = {
  initializeCache
}
