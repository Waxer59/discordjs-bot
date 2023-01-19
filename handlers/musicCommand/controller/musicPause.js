const musicPause = (client, interaction) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  const isPaused = guildQueue?.connection.paused
  guildQueue.setPaused(!isPaused)
  if (!isPaused && guildQueue?.songs) {
    // interaction.update({ content: 'Queue paused ⏯️\n' })
    console.log('Queue paused')
  }
}

module.exports = {
  musicPause
}
