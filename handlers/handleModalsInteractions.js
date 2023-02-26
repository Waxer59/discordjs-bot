const {
  handleSumbitSourcebin
} = require('./commands/sourcebin/handleSourcebin')
const {
  handleSumbitTicketForm
} = require('./commands/ticketSystem/handleTicketSystemChannels')

const handleModalsInteractions = (interaction, client) => {
  switch (interaction.customId) {
    case 'form-ticket':
      handleSumbitTicketForm(interaction)
      break
    case 'sourcebin':
      handleSumbitSourcebin(interaction)
      break
  }
}

module.exports = {
  handleModalsInteractions
}
