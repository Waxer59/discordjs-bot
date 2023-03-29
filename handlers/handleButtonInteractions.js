const { handleMusicButtons } = require('./commands/musicSystem/handleMusicSystem')
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
    handleMusicButtons(client, interaction)
  } else if (TICKET_BUTTONS.includes(buttonId)) {
    handleTicketButtonsInteraction(client, interaction, buttonId)
  } else if (buttonId.includes(POLL_BUTTONS)) {
    const option = buttonId.split('-').reverse()[0]

    const channelId = interaction.channelId
    const channel = client.channels.cache.get(channelId)

    interaction.reply({
      ephemeral: true,
      content: `You have voted **${option}**`
    })
  }
}

module.exports = {
  handleButtonInteractions
}
