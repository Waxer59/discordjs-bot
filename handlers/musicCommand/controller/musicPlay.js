const { updateMusicChart } = require('../../../helpers/updateMusicChart')

const musicPlay = async (client, interaction, query) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  const queue = client.player.createQueue(interaction.guild.id)

  await queue.join(interaction.member.voice.channel)
  try {
    if (query.includes('list=')) {
      await queue.playlist(query)
    } else {
      await queue.play(query)
    }
    updateMusicChart(client, interaction, {
      color: '#fb644c'
    })
  } catch (error) {
    console.log(error)
    queue.stop()
    if (!guildQueue) queue.stop()
  }
}

module.exports = {
  musicPlay
}
