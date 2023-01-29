const { updateMusicChart } = require('../../../helpers/music/updateMusicChart')

const musicStop = (client, interaction) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  guildQueue?.clearQueue()
  guildQueue?.stop()
  updateMusicChart(client, interaction, {})
}

module.exports = {
  musicStop
}
