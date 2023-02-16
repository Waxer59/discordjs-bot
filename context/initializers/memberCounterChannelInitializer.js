const {
  getMemberCounterChannelByServerId,
  deleteMemberCounterChannelByServerId
} = require('../../db/services/memberCounterChannelService')
const { createContextParam } = require('../manageContext')
const { contextTypes } = require('../types/contextTypes')

const initializeMemberCounterChannel = async (client, id) => {
  const content = await getMemberCounterChannelByServerId(id)
  if (content.length <= 0) {
    return
  }

  const { channelName, channelId, serverId } = content[0]
  const channel = client.channels.cache.get(channelId.replace(/[^0-9]/g, ''))
  if (!channel) {
    deleteMemberCounterChannelByServerId(id)
    return
  }

  createContextParam(
    `${id}`,
    {
      [contextTypes().MEMBER_COUNTER_CHANNEL]: {
        channelId,
        channelName,
        serverId
      }
    },
    {
      override: true
    }
  )
}

module.exports = {
  initializeMemberCounterChannel
}
