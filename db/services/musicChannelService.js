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

const deleteMusicChannelByServerId = async (serverId) => {
  const musicChannel = await MusicChannel.findOneAndRemove({ serverId })
  return musicChannel
}

module.exports = {
  getMusicChannelByServerId,
  createMusicChannel,
  deleteMusicChannelByServerId
}
