const { getMusicChart } = require('./getMusicChart')

const resetMusicChart = async (client, controlsMessage) => {
  const musicEmbed = getMusicChart(client, {})

  controlsMessage.edit({
    embeds: [musicEmbed]
  })

  return musicEmbed
}

module.exports = {
  resetMusicChart
}
