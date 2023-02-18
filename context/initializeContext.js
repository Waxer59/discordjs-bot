const {
  initializeMusicChannels
} = require('./initializers/musicChannelInitializer')
const {
  initializeTicketSystem
} = require('./initializers/ticketSystemInitializer')

const initializeContext = async (client, id) => {
  initializeMusicChannels(client, id)
  initializeTicketSystem(client, id)
}

module.exports = {
  initializeContext
}
