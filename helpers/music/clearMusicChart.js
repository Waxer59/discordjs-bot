const { EmbedBuilder } = require('@discordjs/builders')
const { getContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')

const clearMusicChart = (client) => {
  const currentChannel = getContextParam(contextTypes().MUSIC_CHANNELS)
  const musicEmbed = new EmbedBuilder()
    .setDescription('**No song playing currently.**')
    //! .setColor("Purple") TODO: FIX PROPERTY
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
}

module.exports = {
  clearMusicChart
}