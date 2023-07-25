const { btnsControls } = require('../../../commands/music/music-constants')
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
const { deleteValue, setValue } = require('../../../cache/client')
const { MUSIC_CHANNEL } = require('../../../cache/prefixes/cachePrefixes')

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

const handleBotDisconnection = async (client, controlsMessage) => {
  await resetMusicChart(client, controlsMessage)
}

const handleMusicChannelDelete = async (serverId) => {
  await deleteMusicChannelByServerId(serverId)
  await deleteValue(`${MUSIC_CHANNEL}:${serverId}`)
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

const handleMusicChartDelete = async (client, interaction, musicChannel) => {
  const serverId = interaction.guildId
  const channelId = musicChannel.channelId
  const channel = client.channels.cache.get(channelId)

  if (!channel) {
    return
  }

  const controlsMessage = await newServerMusicChart(client, serverId, channel)

  await deleteValue(`${MUSIC_CHANNEL}:${serverId}`)
  await setValue(`${MUSIC_CHANNEL}:${serverId}`, {
    serverId: interaction.guild.id,
    channelId: channel.id,
    controlsMessageId: controlsMessage.id
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
