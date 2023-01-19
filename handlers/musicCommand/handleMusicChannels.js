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

  await queue.join(interaction.member.voice.channel)

  try {
    await queue.play(query)

    updateMusicEmbed(client, guildQueue.songs)
  } catch (error) {
    console.log(error)
    if (!guildQueue) queue.stop()
  }
}

const handleMusicButtonsInteractions = (client, interaction, butonId) => {
  const guildQueue = client.player.getQueue(interaction.guild.id)
  const [, ...queue] = guildQueue?.songs ?? []
  const repeatMode = (guildQueue?.repeatMode + 1) % 3
  const isPaused = guildQueue?.connection.paused
  const shuffleSongs = guildQueue?.shuffle()

  if (guildQueue?.songs[0] === undefined) {
    interaction.update({ content: '' })
    guildQueue.songs = guildQueue.songs.filter((el) => el)
    return
  }
  try {
    switch (butonId) {
      case 'pause':
        guildQueue.setPaused(!isPaused)
        if (!isPaused && guildQueue?.songs) {
          interaction.update({ content: 'Queue paused ⏯️\n' })
          return
        }
        break
      case 'next':
        guildQueue?.skip()

        updateMusicEmbed(client, queue)
        break
      case 'stop':
        guildQueue?.clearQueue()
        guildQueue?.stop()

        updateMusicEmbed(client)
        break
      case 'repeat':
        guildQueue.setRepeatMode(repeatMode)
        switch (repeatMode) {
          case 1:
            interaction.update({ content: 'Looping song 🔄️' })
            return
          case 2:
            interaction.update({ content: 'Looping queue 🔄️' })
            return
        }
        break
      case 'shuffle':
        updateMusicEmbed(client, shuffleSongs)
        break
    }
  } catch (error) {}

  interaction.update({ content: '' })
}

const updateMusicEmbed = (client, queueSongs = []) => {
  const songsArr = []
  const currentChannel = getContextParam(contextTypes().MUSIC_CHANNELS)
  queueSongs = queueSongs.filter((el) => el)

  if (queueSongs?.length > 0) {
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

  currentChannel?.controlsMessage.edit({
    embeds: [musicEmbed]
  })
}

const handleBotDisconnection = (client) => {
  updateMusicEmbed(client)
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
    return true
  }
  return false
}

module.exports = {
  handleMusicChannels,
  handleBotDisconnection,
  handleMusicButtonsInteractions
}
