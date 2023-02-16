const { getContextParam } = require('../context/manageContext')
const { contextTypes } = require('../context/types/contextTypes')
const { handleGlobalButtons } = require('./commands/handleGlobalButtons')
const {
  handleMusicButtons
} = require('./commands/musicCommand/handleMusicChannels')
const {
  handleTicketSystemButtons
} = require('./commands/ticketSystem/handleTicketSystemChannels')

const handleButtonInteractions = (client, interaction) => {
  const channelId = interaction.channel.id
  if (
    channelId ===
      getContextParam(`${interaction.guild.id}`)?.[contextTypes().MUSIC_CHANNEL]
        ?.channelId &&
    interaction.guild.members?.me.voice.channelId ===
      interaction.member.voice.channelId
  ) {
    handleMusicButtons(client, interaction)
  } else if (
    channelId ===
    getContextParam(`${interaction.guild.id}`)?.[contextTypes().TICKET_CHANNEL]
      ?.channelId
  ) {
    handleTicketSystemButtons(client, interaction)
  } else {
    handleGlobalButtons(client, interaction)
  }
}

module.exports = {
  handleButtonInteractions
}
