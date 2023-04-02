const {
  getMusicChannelByServerId,
  deleteMusicChannelByServerId
} = require('../../db/services/musicChannelService')
const { resetMusicChart } = require('../../helpers/music/resetMusicChart')
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
  createServerContextParam(`${serverId}`, {
    [MUSIC_CHANNEL]: {
      channelId,
      serverId,
      controlsMessage: await channel.messages.fetch(controlsMessageId)
    }
  })
  resetMusicChart(serverId, client)
}

module.exports = {
  initializeMusicChannels
}
