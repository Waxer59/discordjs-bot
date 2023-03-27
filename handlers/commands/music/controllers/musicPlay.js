const {
  updateMusicChart
} = require('../../../../helpers/music/updateMusicChart')

const musicPlay = async (client, interaction, query) => {
  if (
    interaction.guild.members?.me.voice.channelId !==
      interaction.member.voice.channelId &&
    interaction.guild?.members?.me?.voice?.channelId !== null
  ) {
    return false
  }
  const voiceChannel = interaction.member?.voice?.channel

  try {
    await client.player.play(voiceChannel, query)
    updateMusicChart(client, interaction, {
      color: '#fb644c'
    })
  } catch (error) {
    console.error(error)
    client.player.stop(interaction)
  }

  return true
}

module.exports = {
  musicPlay
}
