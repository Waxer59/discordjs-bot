const { getContextParam } = require('../context/manageContext')
const {
  MUSIC_CHANNEL,
  TICKET_CHANNEL
} = require('../context/types/contextTypes')
const { handleGlobalButtons } = require('./commands/handleGlobalButtons')
const {
  handleMusicButtons
} = require('./commands/music/handleMusicChannels')
const {
  handleTicketSystemButtons
} = require('./commands/ticketSystem/handleTicketSystemChannels')

const handleButtonInteractions = (client, interaction) => {
  const channelId = interaction.channel.id
  if (
    channelId ===
      getContextParam(`${interaction.guild.id}`)?.[MUSIC_CHANNEL]?.channelId &&
    interaction.guild.members?.me.voice.channelId ===
      interaction.member.voice.channelId
  ) {
    handleMusicButtons(client, interaction)
  } else if (
    getContextParam(`${interaction.guild.id}`)?.[TICKET_CHANNEL]?.find(
      (el) => el.channelId === channelId
    )
  ) {
    handleTicketSystemButtons(client, interaction)
  } else {
    handleGlobalButtons(client, interaction)
  }
}

module.exports = {
  handleButtonInteractions
}
