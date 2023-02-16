const {
  initializeMemberCounterChannel
} = require('./initializers/memberCounterChannelInitializer')
const {
  initializeMusicChannels
} = require('./initializers/musicChannelInitializer')

const initializeContext = async (client, id) => {
  initializeMusicChannels(client, id)
  initializeMemberCounterChannel(client, id)
}

module.exports = {
  initializeContext
}
