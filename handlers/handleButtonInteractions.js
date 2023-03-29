const { handleMusicButtons } = require('./commands/music/handleMusicChannels')
const {
  handleTicketButtonsInteraction
} = require('./commands/ticketSystem/handleTicketSystemChannels')

const TICKET_BUTTONS = [
  'close-ticket-confirm',
  'transcript-ticket',
  'close-ticket',
  'open-ticket'
]
const MUSIC_BUTTONS = ['pause', 'skip', 'stop', 'loop', 'shuffle']

const handleButtonInteractions = (client, interaction) => {
  const buttonId = interaction.customId

  if (
    MUSIC_BUTTONS.includes(buttonId) &&
    interaction.guild.members?.me.voice.channelId ===
      interaction.member.voice.channelId
  ) {
    handleMusicButtons(client, interaction)
  } else if (TICKET_BUTTONS.includes(buttonId)) {
    handleTicketButtonsInteraction(client, interaction, buttonId)
  }
}

module.exports = {
  handleButtonInteractions
}
