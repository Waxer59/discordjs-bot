const { updateMusicChart } = require('../../../helpers/music/updateMusicChart')

const musicSkip = (client, interaction) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)

  guildQueue?.skip()
  guildQueue.connection.paused = false
  updateMusicChart(client, interaction, { isSkiped: true })
}

module.exports = {
  musicSkip
}
