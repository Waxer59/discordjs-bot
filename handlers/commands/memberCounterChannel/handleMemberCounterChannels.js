const { removeContextParam } = require('../../../context/manageContext')
const { contextTypes } = require('../../../context/types/contextTypes')
const {
  deleteMemberCounterChannelByServerId
} = require('../../../db/services/memberCounterChannelService')

const handleDeleteMemberCounterChannel = async (serverId) => {
  await deleteMemberCounterChannelByServerId(serverId)
  removeContextParam(serverId, contextTypes().MEMBER_COUNTER_CHANNEL)
}

module.exports = {
  handleDeleteMemberCounterChannel
}
