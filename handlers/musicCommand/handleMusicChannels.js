const { Player } = require('discord-music-player')
const { removeContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const {
  deleteMusicChannelByServerId
} = require('../../db/services/musicChannelService')
const { resetMusicChart } = require('../../helpers/music/resetMusicChart')
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

const handleMusicButtonsInteractions = async (client, interaction, butonId) => {
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
        if (!musicSkip(client, interaction)) {
          const botMessage = await interaction.channel.send({
            content: 'You cant skip a paused song!'
          })
          setTimeout(() => {
            client.channels.fetch(interaction.channel.id).then((channel) => {
              channel.messages.delete(botMessage.id)
            })
          }, 3000)
        }
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

const handleBotDisconnection = (interaction) => {
  resetMusicChart(interaction.guild.id)
}

const handleMusicChannelDelete = async (client, channelId) => {
  const player = new Player(client)
  client.player = player
  await deleteMusicChannelByServerId(channelId)
  removeContextParam(`${channelId}_${contextTypes().MUSIC_CHANNELS}`)
}

module.exports = {
  handleMusicChannels,
  handleBotDisconnection,
  handleMusicButtonsInteractions,
  handleMusicChannelDelete
}
