const {
  updateMusicChart
} = require('../../../../helpers/music/updateMusicChart')

const musicShuffle = (client, interaction) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  guildQueue?.shuffle()
  updateMusicChart(client, interaction, {})
}

module.exports = {
  musicShuffle
}
