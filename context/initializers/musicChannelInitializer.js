const {
  getMusicChannelByServerId,
  deleteMusicChannelByServerId,
} = require('../../db/services/musicChannelService')
const {
  newServerMusicChart
} = require('../../handlers/commands/musicSystem/handleMusicSystem')
const { resetMusicChart } = require('../../helpers/music/')
const { createServerContextParam } = require('../manageContext')
const { MUSIC_CHANNEL } = require('../types/contextTypes')

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
    resetMusicChart(serverId, client)
  } catch (error) {
    controlsMessage = newServerMusicChart(client, serverId, channel)
  }

  createServerContextParam(`${serverId}`, {
    [MUSIC_CHANNEL]: {
      channelId,
      serverId,
      controlsMessage
    }
  })
}

module.exports = {
  initializeMusicChannels
}
