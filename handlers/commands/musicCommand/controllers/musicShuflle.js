const {
  updateMusicChart
} = require('../../../../helpers/music/updateMusicChart')

const musicShuffle = (client, interaction) => {
  client.player.shuffle(interaction)
  updateMusicChart(client, interaction, {})
}

module.exports = {
  musicShuffle
}
