const musicLoop = (client, interaction, repeatMode) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  guildQueue.setRepeatMode(repeatMode)
  console.log(repeatMode)
  switch (repeatMode) {
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
