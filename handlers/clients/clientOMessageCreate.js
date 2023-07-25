const { Events } = require('discord.js')
const {
  handleMusicChannels
} = require('../commands/musicSystem/handleMusicSystem')
const { getValue } = require('../../cache/client')
const { MUSIC_CHANNEL } = require('../../cache/prefixes/cachePrefixes')

const clientOnMessageCreate = (client) => {
  client.on(Events.MessageCreate, async (interaction) => {
    if (interaction.author.bot) {
      return
    }

    const musicChannel = await getValue(
      `${MUSIC_CHANNEL}:${interaction.guild.id}`
    )
    if (musicChannel?.channelId === interaction.channelId) {
      await handleMusicChannels(client, interaction)
    }
  })
}

module.exports = {
  clientOnMessageCreate
}
