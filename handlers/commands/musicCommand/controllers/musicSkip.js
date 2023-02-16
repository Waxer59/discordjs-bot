const {
  updateMusicChart
} = require('../../../../helpers/music/updateMusicChart')

const musicSkip = (client, interaction) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  if (guildQueue.connection.paused) {
    return false
  }
  guildQueue?.skip()
  guildQueue.connection.paused = false
  updateMusicChart(client, interaction, { isSkiped: true })
  return true
}

module.exports = {
  musicSkip
}
