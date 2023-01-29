const { updateMusicChart } = require('../../../helpers/music/updateMusicChart')

const musicPause = async (client, interaction, pause = null) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  const isPaused = guildQueue?.connection.paused
  guildQueue.setPaused(pause ?? !isPaused)
  if (!isPaused && guildQueue?.songs) {
    await updateMusicChart(client, interaction, {
      footer: { text: 'Song paused ⏸️' }
    })
    return
  }
  await updateMusicChart(client, interaction, {})
}

module.exports = {
  musicPause
}
