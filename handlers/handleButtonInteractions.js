const {
  handleMusicButtonsInteraction
} = require('./commands/musicSystem/handleMusicSystem')
const { handlePollButtonsInteraction } = require('./commands/poll/handlePoll')
const {
  handleTicketButtonsInteraction
} = require('./commands/ticketSystem/handleTicketSystem')

const TICKET_BUTTONS = [
  'close-ticket-confirm',
  'transcript-ticket',
  'close-ticket',
  'open-ticket'
]
const MUSIC_BUTTONS = ['pause', 'skip', 'stop', 'loop', 'shuffle']
const POLL_BUTTONS = 'poll:'

const handleButtonInteractions = (client, interaction) => {
  const buttonId = interaction.customId

  if (
    MUSIC_BUTTONS.includes(buttonId) &&
    interaction.guild.members?.me.voice.channelId ===
      interaction.member.voice.channelId
  ) {
    handleMusicButtonsInteraction(client, interaction)
  } else if (TICKET_BUTTONS.includes(buttonId)) {
    handleTicketButtonsInteraction(client, interaction, buttonId)
  } else if (buttonId.includes(POLL_BUTTONS)) {
    handlePollButtonsInteraction(client, interaction, buttonId)
  }
}

module.exports = {
  handleButtonInteractions
}
