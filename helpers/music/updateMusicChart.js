const { getValue } = require('../../cache/client')
const { MUSIC_CHANNEL } = require('../../cache/types/cacheTypes')
const { getMusicChart } = require('./getMusicChart')

const updateMusicChart = async (
  client,
  interaction,
  {
    description = 'No songs playing currently.',
    footer = {
      text: null,
      iconURL: null
    },
    img = 'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5',
    isSkiped = false
  }
) => {
  const songsArr = []
  const guildQueue = client.player.getQueue(interaction)
  const musicChannel = await getValue(
    `${MUSIC_CHANNEL}:${interaction.guild.id}`
  )
  const queueSongs = guildQueue?.songs.filter((el, idx) => {
    if (isSkiped && idx === 0) {
      return false
    }
    return el
  })

  if (queueSongs?.length > 0) {
    queueSongs.forEach(({ name, thumbnail, url }) => {
      songsArr.push({ name, img: thumbnail, url })
    })
  }

  const musicEmbed = getMusicChart(client, {
    description:
      songsArr
        .map(({ name }) => '• ' + name)
        .splice(0, 10)
        .join('\n\n') || description,
    footer: {
      text: footer.text ?? songsArr[0]?.url ?? '**Here will appear the url**',
      iconURL: footer.iconURL ?? client.user.displayAvatarURL()
    },
    img: songsArr[0]?.img ?? img
  })

  if (musicChannel) {
    const channel = client.channels.cache.get(musicChannel?.channelId)
    const controlsMessage = await channel.messages.fetch(
      musicChannel?.controlsMessageId
    )
    await controlsMessage.edit({
      embeds: [musicEmbed]
    })
  }
  return musicEmbed
}

module.exports = {
  updateMusicChart
}
