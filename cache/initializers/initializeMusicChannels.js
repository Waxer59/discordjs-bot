const {
  getMusicChannelByServerId,
  deleteMusicChannelByServerId
} = require('../../db/services/musicChannelService')
const {
  newServerMusicChart
} = require('../../handlers/commands/musicSystem/handleMusicSystem')
const { resetMusicChart } = require('../../helpers/music/')
const { setValue } = require('../client')
const { MUSIC_CHANNEL } = require('../types/cacheTypes')

const initializeMusicChannels = async (client, serverId) => {
  const content = await getMusicChannelByServerId(serverId)
  if (content.length <= 0) {
    return
  }
  const { controlsMessageId, channelId } = content[0]
  const channel = client.channels.cache.get(channelId)
  if (!channel) {
    deleteMusicChannelByServerId(serverId)
    return
  }
  let controlsMessage
  try {
    controlsMessage = await channel.messages.fetch(controlsMessageId)
    resetMusicChart(client, controlsMessage)
  } catch (error) {
    controlsMessage = newServerMusicChart(client, serverId, channel)
  }

  await setValue(`${MUSIC_CHANNEL}:${serverId}`, {
    channelId,
    serverId,
    controlsMessageId
  })
}

module.exports = {
  initializeMusicChannels
}
