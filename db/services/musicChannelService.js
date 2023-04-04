const MusicChannel = require('../models/musicChannelModel')

const createMusicChannel = async ({
  serverId,
  channelId,
  controlsMessageId
}) => {
  const musicChannel = new MusicChannel({
    serverId,
    channelId,
    controlsMessageId
  })

  await musicChannel.save()
  return musicChannel
}

const getMusicChannelByServerId = async (serverId) => {
  const musicChannel = await MusicChannel.find({ serverId })
  return musicChannel
}

const updateMusicChannelByServerId = async (serverId, data = {}) => {
  const musicChannel = await MusicChannel.findOneAndUpdate({ serverId }, data)
  return musicChannel
}

const deleteMusicChannelByServerId = async (serverId) => {
  const musicChannel = await MusicChannel.findOneAndRemove({ serverId })
  return musicChannel
}

const deleteAllMusicChannelsByServerId = async (serverId) => {
  const musicChannels = await MusicChannel.deleteMany({ serverId })
  return musicChannels
}

module.exports = {
  getMusicChannelByServerId,
  createMusicChannel,
  deleteMusicChannelByServerId,
  deleteAllMusicChannelsByServerId,
  updateMusicChannelByServerId
}
