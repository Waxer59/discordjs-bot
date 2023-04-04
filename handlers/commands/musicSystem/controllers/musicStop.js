const {
  updateMusicChart
} = require('../../../../helpers/music')

const musicStop = (client, interaction) => {
  client.player.stop(interaction)
  updateMusicChart(client, interaction, {})
}

module.exports = {
  musicStop
}
