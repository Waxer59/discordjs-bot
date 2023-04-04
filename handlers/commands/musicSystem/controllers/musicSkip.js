const {
  updateMusicChart
} = require('../../../../helpers/music')

const musicSkip = (client, interaction) => {
  const musicQueue = client.player.getQueue(interaction.guild.id)
  if (musicQueue.songs.length <= 1) {
    client.player.stop(interaction)
  } else {
    client.player.skip(interaction)
  }
  updateMusicChart(client, interaction, { isSkiped: true })
}

module.exports = {
  musicSkip
}
