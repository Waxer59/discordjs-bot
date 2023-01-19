const { updateMusicChart } = require('../../../helpers/updateMusicChart')

const musicSkip = (client, interaction) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)

  guildQueue?.skip()
  guildQueue.connection.paused = false
  guildQueue.songs = guildQueue?.songs.filter((_, i) => i) ?? []
  updateMusicChart(client, interaction)
}

module.exports = {
  musicSkip
}
