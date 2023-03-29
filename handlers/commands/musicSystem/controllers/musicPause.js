const {
  updateMusicChart
} = require('../../../../helpers/music/updateMusicChart')

const musicPause = async (client, interaction, pause = null) => {
  const guildQueue = client.player.getQueue(interaction)
  const setPauseValue = guildQueue.paused

  setPause(client, interaction, pause ?? !setPauseValue)
  if (!setPauseValue && guildQueue?.songs) {
    await updateMusicChart(client, interaction, {
      footer: { text: 'Song paused ⏸️' }
    })
    return
  }
  await updateMusicChart(client, interaction, {})
}

const setPause = (client, interaction, pause) => {
  if (pause) {
    client.player.pause(interaction)
  } else {
    client.player.resume(interaction)
  }
}

module.exports = {
  musicPause
}
