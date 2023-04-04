const { getServerContextParam } = require('../../context/manageContext')
const { MUSIC_CHANNEL } = require('../../context/types/contextTypes')
const { getMusicChart } = require('./getMusicChart')

const resetMusicChart = (serverId, client) => {
  const currentChannel = getServerContextParam(`${serverId}`)?.[MUSIC_CHANNEL]
  const musicEmbed = getMusicChart(client, {})

  currentChannel?.controlsMessage.edit({
    embeds: [musicEmbed]
  })

  return musicEmbed
}

module.exports = {
  resetMusicChart
}
