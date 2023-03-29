const { Events } = require('discord.js')
const { getContextParam } = require('../../context/manageContext')
const { MUSIC_CHANNEL } = require('../../context/types/contextTypes')
const {
  handleMusicChannels
} = require('../commands/musicSystem/handleMusicSystem')

const clientOnMessageCreate = (client) => {
  client.on(Events.MessageCreate, async (interaction) => {
    if (interaction.author.bot) {
      return
    }
    const channelId = interaction.channel.id
    if (
      getContextParam(`${interaction.guild.id}`)?.[MUSIC_CHANNEL]?.channelId ===
      channelId
    ) {
      await handleMusicChannels(client, interaction)
    }
  })
}

module.exports = {
  clientOnMessageCreate
}
