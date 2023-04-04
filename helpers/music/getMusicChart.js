const { EmbedBuilder } = require('discord.js')

const getMusicChart = (
  client,
  {
    description = 'No songs playing currently.',
    footer = {
      text: null,
      iconURL: null
    },
    img = 'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'
  }
) => {
  const musicEmbed = new EmbedBuilder()
    .setDescription(description)
    .setFooter({
      text: footer.text ?? '**Here will appear the url**',
      iconURL: footer.iconURL ?? client.user.displayAvatarURL()
    })
    .setImage(img)
  return musicEmbed
}

module.exports = {
  getMusicChart
}
