const { updateMusicChart } = require('../../../helpers/music/updateMusicChart')

const musicLoop = (client, interaction, repeatMode) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  guildQueue.setRepeatMode(repeatMode)
  switch (repeatMode) {
    case 0:
      updateMusicChart(client, interaction, {})
      break
    case 1:
      updateMusicChart(client, interaction, {
        footer: { text: 'Looping song 🔄️' }
      })
      break
    case 2:
      updateMusicChart(client, interaction, {
        footer: { text: 'Looping queue 🔄️' }
      })
      break
  }
}

module.exports = {
  musicLoop
}
