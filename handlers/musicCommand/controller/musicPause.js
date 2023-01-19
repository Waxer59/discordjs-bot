const { updateMusicChart } = require('../../../helpers/updateMusicChart')

const musicPause = (client, interaction, pause = null) => {
  console.log(pause)
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