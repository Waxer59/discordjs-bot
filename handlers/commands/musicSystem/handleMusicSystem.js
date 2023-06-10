const { btnsControls } = require('../../../commands/music/music-constants')
const {
  removeServerContextParam,
  editServerContextParam
} = require('../../../context/manageContext')
const { MUSIC_CHANNEL } = require('../../../context/types/contextTypes')
const {
  deleteMusicChannelByServerId,
  updateMusicChannelByServerId
} = require('../../../db/services/musicChannelService')
const { resetMusicChart, getMusicChart } = require('../../../helpers/music')
const {
  musicShuffle,
  musicPause,
  musicLoop,
  musicSkip,
  musicStop,
  musicPlay
} = require('./controllers')

const handleMusicChannels = async (client, interaction) => {
  const voiceChannel = interaction.member.voice.channel?.id
  if (!voiceChannel) {
    const botMessage = await interaction.channel.send({
      content: `You have to be on a voice channel! <@${interaction.author.id}>`
    })
    interaction.delete()
    setTimeout(() => {
      client.channels.fetch(interaction.channel.id).then((channel) => {
        channel.messages.delete(botMessage.id)
      })
    }, 3000)
    return
  }

  const query = interaction.content

  interaction.delete()
  musicPlay(client, interaction, query)
}

const handleMusicButtonsInteraction = async (client, interaction) => {
  const buttonId = interaction.customId
  const guildQueue = client.player.getQueue(interaction.guild.id)

  if (guildQueue?.songs) {
    guildQueue.songs = guildQueue.songs.filter((el) => el)
  }

  if (guildQueue?.songs[0] === undefined) {
    interaction.update({ content: '' })
    return
  }

  try {
    switch (buttonId) {
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

const handleBotDisconnection = (client, interaction) => {
  resetMusicChart(interaction.guild.id, client)
}

const handleMusicChannelDelete = async (serverId) => {
  await deleteMusicChannelByServerId(serverId)
  removeServerContextParam(serverId, MUSIC_CHANNEL)
}

const newServerMusicChart = async (client, serverId, channel) => {
  const musicEmbed = getMusicChart(client, {})
  const controlsMessage = await channel.send({
    embeds: [musicEmbed],
    components: [btnsControls]
  })
  await updateMusicChannelByServerId(serverId, {
    controlsMessageId: controlsMessage.id
  })

  return controlsMessage
}

const handleMusicChartDelete = async (client, interaction, serverContext) => {
  const serverId = interaction.guildId
  const channelId = serverContext[MUSIC_CHANNEL].channelId
  const channel = client.channels.cache.get(channelId)

  if (!channel) {
    return
  }

  const controlsMessage = newServerMusicChart(client, serverId, channel)
  editServerContextParam(serverId, MUSIC_CHANNEL, {
    serverId: interaction.guild.id,
    channelId: channel.id,
    controlsMessage
  })
}

module.exports = {
  handleMusicChannels,
  handleBotDisconnection,
  handleMusicButtonsInteraction,
  handleMusicChannelDelete,
  handleMusicChartDelete,
  newServerMusicChart
}