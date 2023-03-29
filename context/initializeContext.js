const {
  initializeMusicChannels,
  initializeTicketSystem
} = require('./initializers/')

const initializeContext = async (client, id) => {
  initializeMusicChannels(client, id)
  initializeTicketSystem(client, id)
}

module.exports = {
  initializeContext
}
