const {
  deleteAllMusicChannelsByServerId
} = require('../db/services/musicChannelService')
const {
  deleteAllTicketSystemsByServerId
} = require('../db/services/ticketSystemService')

const handleGuildDelete = async (serverId) => {
  await deleteAllMusicChannelsByServerId(serverId)
  await deleteAllTicketSystemsByServerId(serverId)
}

module.exports = {
  handleGuildDelete
}
