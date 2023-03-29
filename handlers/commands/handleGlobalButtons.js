const {
  handleTicketButtonsInteraction
} = require('./ticketSystem/handleTicketSystemChannels')

const handleGlobalButtons = async (client, interaction) => {
  const buttonId = interaction.customId

  if (
    ['close-ticket-confirm', 'transcript-ticket', 'close-ticket'].includes(
      buttonId
    )
  ) {
    handleTicketButtonsInteraction(interaction, buttonId)
  }
}

module.exports = {
  handleGlobalButtons
}
