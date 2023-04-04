const {
  updateMusicChart
} = require('../../../../helpers/music')

const musicShuffle = (client, interaction) => {
  client.player.shuffle(interaction)
  updateMusicChart(client, interaction, {})
}

module.exports = {
  musicShuffle
}
