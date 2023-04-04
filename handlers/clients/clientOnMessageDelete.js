const { Events } = require('discord.js')
const {
  getServerContextParam
} = require('../../context/manageContext')
const { MUSIC_CHANNEL, POLL } = require('../../context/types/contextTypes')
const { handleDeletePollMessage } = require('../commands/poll/handlePoll')
const { handleMusicChartDelete } = require('../commands/musicSystem/handleMusicSystem')

const clientOnMessageDelete = (client) => {
  client.on(Events.MessageDelete, async (interaction) => {
    const serverId = interaction.guildId
    const serverContext = getServerContextParam(serverId)
    const interactionId = interaction.id

    if (serverContext?.[MUSIC_CHANNEL]?.controlsMessage?.id === interactionId) {
      handleMusicChartDelete(client, interaction, serverContext)
    }

    if (
      serverContext?.[POLL]?.filter((el) => el.id === interactionId).length > 0
    ) {
      handleDeletePollMessage(interactionId)
    }
  })
}

module.exports = {
  clientOnMessageDelete
}
