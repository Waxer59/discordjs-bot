const { removeAllServerContext } = require('../context/manageContext')
const {
  deleteAllMusicChannelsByServerId
} = require('../db/services/musicChannelService')
const {
  deleteAllTicketSystemsByServerId
} = require('../db/services/ticketSystemService')

const handleGuildDelete = async (serverId) => {
  await deleteAllMusicChannelsByServerId(serverId)
  await deleteAllTicketSystemsByServerId(serverId)
  removeAllServerContext(serverId)
}

module.exports = {
  handleGuildDelete
}
