const { clearMusicChart } = require('../../helpers/clearMusicChart')
const {
  musicShuffle,
  musicPause,
  musicLoop,
  musicSkip,
  musicStop,
  musicPlay
} = require('./controller')

const handleMusicChannels = async (
  client,
  interaction,
  { voiceChannel, channelId }
) => {
  if (
    await handleExceptions(client, interaction, { voiceChannel, channelId })
  ) {
    return
  }

  const query = interaction.content

  interaction.delete()

  musicPlay(client, interaction, query)
}

const handleMusicButtonsInteractions = (client, interaction, butonId) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)

  if (guildQueue?.songs) {
    guildQueue.songs = guildQueue.songs.filter((el) => el)
  }

  if (guildQueue?.songs[0] === undefined) {
    interaction.update({ content: '' })
    return
  }

  try {
    switch (butonId) {
      case 'pause':
        musicPause(client, interaction)
        break
      case 'skip':
        musicSkip(client, interaction)
        break
      case 'stop':
        musicStop(client, interaction)
        break
      case 'loop':
        musicLoop(client, interaction, (guildQueue?.repeatMode + 1) % 3)
        break
      case 'shuffle':
        musicShuffle(client, interaction)
        break
    }
  } catch (error) {}

  interaction.update({ content: '' })
}

const handleBotDisconnection = (client) => {
  clearMusicChart(client)
}

const handleExceptions = async (
  client,
  interaction,
  { voiceChannel, channelId }
) => {
  if (!voiceChannel) {
    const botMessage = await interaction.channel.send({
      content: `You have to be on a voice channel! <@${interaction.author.id}>`
    })
    interaction.delete()
    setTimeout(() => {
      client.channels.fetch(channelId).then((channel) => {
        channel.messages.delete(botMessage.id)
      })
    }, 3000)
    return true
  }
  return false
}

module.exports = {
  handleMusicChannels,
  handleBotDisconnection,
  handleMusicButtonsInteractions
}
