const {
  getMusicChannelByServerId,
  deleteMusicChannelByServerId
} = require('../../db/services/musicChannelService')
const { resetMusicChart } = require('../../helpers/music/resetMusicChart')
const { createContextParam } = require('../manageContext')
const { contextTypes } = require('../types/contextTypes')

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
  createContextParam(
    `${serverId}`,
    {
      [contextTypes().MUSIC_CHANNEL]: {
        channelId,
        serverId,
        controlsMessage: await channel.messages.fetch(controlsMessageId)
      }
    },
    {
      override: true
    }
  )
  resetMusicChart(serverId, client)
}

module.exports = {
  initializeMusicChannels
}
