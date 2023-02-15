const {
  initializeMusicChannels
} = require('./initializers/musicChannelInitializer')

const initializeContext = async (client, id) => {
  initializeMusicChannels(client, id)
}

module.exports = {
  initializeContext
}
