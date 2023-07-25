const { Events } = require('discord.js')
const { handleDeletePollMessage } = require('../commands/poll/handlePoll')
const {
  handleMusicChartDelete
} = require('../commands/musicSystem/handleMusicSystem')
const { getValue } = require('../../cache/client')
const { MUSIC_CHANNEL, POLL } = require('../../cache/prefixes/cachePrefixes')

const clientOnMessageDelete = (client) => {
  client.on(Events.MessageDelete, async (interaction) => {
    const serverId = interaction.guildId
    const interactionId = interaction.id

    const musicChannel = await getValue(`${MUSIC_CHANNEL}:${serverId}`)
    const poll = await getValue(`${POLL}:${interactionId}`)

    if (musicChannel?.controlsMessageId === interactionId) {
      handleMusicChartDelete(client, interaction, musicChannel)
    }

    if (poll) {
      handleDeletePollMessage(interactionId)
    }
  })
}

module.exports = {
  clientOnMessageDelete
}
