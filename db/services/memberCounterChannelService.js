const MemberCounterChannel = require('../models/memberCounterChannelModel')

const createMemberCounterChannel = async ({
  serverId,
  channelName,
  channelId
}) => {
  const memberCounterChannel = new MemberCounterChannel({
    serverId,
    channelId,
    channelName
  })

  await memberCounterChannel.save()
  return memberCounterChannel
}
const getMemberCounterChannelByServerId = async (serverId) => {
  const memberCounterChannel = await MemberCounterChannel.find({ serverId })
  return memberCounterChannel
}

const deleteMemberCounterChannelByServerId = async (serverId) => {
  const memberCounterChannel = await MemberCounterChannel.findOneAndRemove({
    serverId
  })
  return memberCounterChannel
}

module.exports = {
  createMemberCounterChannel,
  getMemberCounterChannelByServerId,
  deleteMemberCounterChannelByServerId
}
