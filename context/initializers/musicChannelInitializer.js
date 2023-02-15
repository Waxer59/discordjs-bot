const {
  getMusicChannelByServerId,
  deleteMusicChannelByServerId
} = require('../../db/services/musicChannelService')
const { resetMusicChart } = require('../../helpers/music/resetMusicChart')
const { createContextParam, getAllContext } = require('../manageContext')
const { contextTypes } = require('../types/contextTypes')

const initializeMusicChannels = async (client, id) => {
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
  createContextParam(`${serverId}`, {
    [contextTypes().MUSIC_CHANNEL]: {
      channelId,
      serverId,
      controlsMessage: await channel.messages.fetch(controlsMessageId)
    }
  })
  resetMusicChart(id, client)
  console.log(getAllContext())
}

module.exports = {
  initializeMusicChannels
}
