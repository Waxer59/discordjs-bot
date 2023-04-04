const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

const DEFAULT_TICKET_SYSTEM_NAME = '📌 Ticket system'
const DEFAULT_TICKET_SYSTEM_DESCRIPTION =
  'Click the button below to create a new ticket!'
const DEFAULT_TICKET_SYSTEM_COLOR = 'Purple'

const btnsControls = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('open-ticket')
      .setLabel('📩 Open ticket')
      .setDisabled(false)
      .setStyle(ButtonStyle.Secondary)
  )

module.exports = {
    DEFAULT_TICKET_SYSTEM_NAME,
    DEFAULT_TICKET_SYSTEM_DESCRIPTION,
    DEFAULT_TICKET_SYSTEM_COLOR,
    btnsControls
}