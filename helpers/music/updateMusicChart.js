const { EmbedBuilder } = require('@discordjs/builders')
const { getServerContextParam } = require('../../context/manageContext')
const { MUSIC_CHANNEL } = require('../../context/types/contextTypes')

const updateMusicChart = async (
  client,
  interaction,
  {
    description = '**No song playing currently.**',
    color = 'Purple',
    footer = {
      text: null,
      iconURL: null
    },
    img = 'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5',
    isSkiped = false,
    editChannel = true
  }
) => {
  const songsArr = []
  const guildQueue = client.player.getQueue(interaction)
  const currentChannel = getServerContextParam(`${interaction.guild.id}`)?.[
    MUSIC_CHANNEL
  ]

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

  const musicEmbed = new EmbedBuilder()
    .setDescription(
      songsArr
        .map(({ name }) => '• ' + name)
        .splice(0, 10)
        .join('\n\n') || description
    )
    .setFooter({
      text: footer.text ?? songsArr[0]?.url ?? '**Here will appear the url**',
      iconURL: footer.iconURL ?? client.user.displayAvatarURL()
    })
    .setImage(songsArr[0]?.img ?? img)
  if (editChannel) {
    await currentChannel?.controlsMessage.edit({
      embeds: [musicEmbed]
    })
  }
  return musicEmbed
}

module.exports = {
  updateMusicChart
}
