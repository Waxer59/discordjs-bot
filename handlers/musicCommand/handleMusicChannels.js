const { getContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const { EmbedBuilder } = require('discord.js')

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

  const queue = client.player.createQueue(interaction.guild.id)
  const guildQueue = client.player.getQueue(interaction.guild.id)
  const currentChannel = getContextParam(contextTypes().MUSIC_CHANNELS)

  await queue.join(interaction.member.voice.channel)

  try {
    await queue.play(query)
    updateMusicEmbed(client, guildQueue.songs, currentChannel)
  } catch (error) {
    console.log(error)
    if (!guildQueue) queue.stop()
  }
}

const handleMusicButtonsInteractions = (client, interaction, butonId) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  const currentChannel = getContextParam(contextTypes().MUSIC_CHANNELS)
  const [, ...queue] = guildQueue?.songs ?? []

  const isPaused = guildQueue?.connection.paused
  switch (butonId) {
    case 'pause':
      guildQueue?.setPaused(!isPaused)
      if (!isPaused) {
        interaction.update({ content: 'Queue paused ⏯️\n' })
      } else {
        interaction.update({ content: '' })
      }
      break
    case 'next':
      guildQueue?.skip()

      updateMusicEmbed(client, queue, currentChannel)
      interaction.update({ content: '' })

      break
  }
}

const updateMusicEmbed = (client, queueSongs = [], currentChannel) => {
  const songsArr = []

  if (queueSongs.length > 0) {
    queueSongs.forEach(({ name, thumbnail, url }) => {
      songsArr.push({ name, img: thumbnail, url })
    })
  }

  const musicEmbed = createMusicEmbed({
    description:
      songsArr.map(({ name }) => '• ' + name).join('\n\n') ||
      '**No song playing currently.**',
    footer: {
      text: songsArr[0]?.url ?? 'Here will appear the url of the song!',
      iconURL: client?.user.displayAvatarURL()
    },
    img:
      songsArr[0]?.img ??
      'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'
  })

  currentChannel.controlsMessage.edit({
    embeds: [musicEmbed]
  })
}

const handleBotDisconnection = (client) => {
  // TODO: REMOVE PLAYLIST && IMG ON DISCONNECTION
  updateMusicEmbed()
}

const createMusicEmbed = ({
  description = 'No song playing currently.',
  color = 'Purple',
  footer = {
    text: 'Here will appear the url of the song!',
    iconURL: client.user.displayAvatarURL()
  },
  img = 'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'
}) => {
  return new EmbedBuilder()
    .setDescription(description)
    .setColor(color)
    .setFooter(footer)
    .setImage(img)
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
    console.error('User is not connected to a channel!')
    return true
  }
  return false
}

module.exports = {
  handleMusicChannels,
  handleBotDisconnection,
  handleMusicButtonsInteractions
}
