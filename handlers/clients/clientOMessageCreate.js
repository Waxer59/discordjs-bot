const { Events } = require('discord.js')
const { getContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const { handleMusicChannels } = require('../musicCommand/handleMusicChannels')

const clientOnMessageCreate = (client) => {
  client.on(Events.MessageCreate, async (interaction) => {
    if (interaction.author.bot) {
      return
    }
    const channelId = interaction.channel.id
    //* MUSIC_CHANNELS LOGIC
    if (
      getContextParam(contextTypes().MUSIC_CHANNELS)?.channelId === channelId
    ) {
      await handleMusicChannels(client, interaction)
    }
  })
}

module.exports = {
  clientOnMessageCreate
}
