const musicLoop = (client, interaction, repeatMode) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  guildQueue.setRepeatMode(repeatMode)
  switch (repeatMode) {
    case 1:
      //   interaction.update({ content: 'Looping song 🔄️' })
      console.log('Looping song')
      break
    case 2:
      //   interaction.update({ content: 'Looping queue 🔄️' })
      console.log('Looping queue')
      break
  }
}

module.exports = {
  musicLoop
}
