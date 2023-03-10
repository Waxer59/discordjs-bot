const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders')
const discordTranscripts = require('discord-html-transcripts')
const { ButtonStyle } = require('discord.js')

const DELETE_TICKET_CONFIRMATION_COMPONENTS =
  new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('close-ticket-confirm')
      .setLabel('✅ Confirm')
      .setDisabled(false)
      .setStyle(ButtonStyle.Secondary)
  )

const handleGlobalButtons = async (client, interaction) => {
  const buttonId = interaction.customId

  switch (buttonId) {
    case 'close-ticket-confirm':
      interaction.channel.delete()
      break
    case 'transcript-ticket':
      const attachment = await discordTranscripts.createTranscript(
        interaction.channel
      )
      interaction.reply({
        files: [attachment],
        ephemeral: true
      })
      break
    case 'close-ticket':
      interaction.reply({
        content: '**You are about to delete the ticket, are you sure?**',
        components: [DELETE_TICKET_CONFIRMATION_COMPONENTS],
        ephemeral: true
      })
      break
  }
}

module.exports = {
  handleGlobalButtons
}
