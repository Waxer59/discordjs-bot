const { EmbedBuilder } = require('@discordjs/builders')
const { getContextParam } = require('../../context/manageContext')
const { MUSIC_CHANNEL } = require('../../context/types/contextTypes')

const resetMusicChart = (serverId, client) => {
  const currentChannel = getContextParam(`${serverId}`)?.[MUSIC_CHANNEL]
  const musicEmbed = new EmbedBuilder()
    .setDescription('**No song playing currently.**')
    .setFooter({
      text: 'Here will appear the url of the song!',
      iconURL: client.user.displayAvatarURL()
    })
    .setImage(
      'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'
    )

  currentChannel?.controlsMessage.edit({
    embeds: [musicEmbed]
  })

  return musicEmbed
}

module.exports = {
  resetMusicChart
}
