const { updateMusicChart } = require('../../../helpers/music/updateMusicChart')

const musicPause = (client, interaction, pause = null) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  const isPaused = guildQueue?.connection.paused
  guildQueue.setPaused(pause ?? !isPaused)
  if (!isPaused && guildQueue?.songs) {
    updateMusicChart(client, interaction, {
      footer: { text: 'Song paused ⏸️' }
    })
    return
  }
  updateMusicChart(client, interaction, {
    footer: { text: null }
  })
}

module.exports = {
  musicPause
}
