const {
  getMusicChannelByServerId,
  deleteMusicChannelByServerId
} = require('../db/services/musicChannelService')
const { resetMusicChart } = require('../helpers/music/resetMusicChart')
const { createContextParam } = require('./manageContext')
const { contextTypes } = require('./types/contextTypes')

const initializeContext = async (client, id) => {
  const content = await getMusicChannelByServerId(id)
  if (content.length <= 0) {
    return
  }
  const { controlsMessageId, channelId, serverId } = content[0]
  const channel = client.channels.cache.get(channelId)
  if (!channel) {
    deleteMusicChannelByServerId(id)
    return
  }
  createContextParam(`${serverId}_${contextTypes().MUSIC_CHANNELS}`, {
    channelId,
    serverId,
    controlsMessage: await channel.messages.fetch(controlsMessageId)
  })
  resetMusicChart(id, client)
}

module.exports = {
  initializeContext
}
