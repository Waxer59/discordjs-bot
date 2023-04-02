const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require('discord.js')

const TICKET_CONTROLS_EMBED = new EmbedBuilder()
  .setTitle('**Close Ticket**')
  .setDescription('Close the ticket by clicking the button bellow!')
  .setColor('Red')

const TICKET_CONTROLS_COMPONENTS = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('close-ticket')
    .setLabel('🔒 Close')
    .setDisabled(false)
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId('transcript-ticket')
    .setLabel('📜 Transcript')
    .setDisabled(false)
    .setStyle(ButtonStyle.Primary)
)

const TICKET_DESCRIPTION = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setMinLength(1)
    .setCustomId('description-ticket')
    .setLabel('Describe your ticket')
    .setPlaceholder('Describe in a few words the reason for your ticket')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)
)

const MODAL_TICKET = new ModalBuilder()
  .setCustomId('form-ticket')
  .setTitle('New ticket')
  .addComponents(TICKET_DESCRIPTION)

const DELETE_TICKET_CONFIRMATION_COMPONENT =
  new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('close-ticket-confirm')
      .setLabel('✅ Confirm')
      .setDisabled(false)
      .setStyle(ButtonStyle.Secondary)
  )

const MAX_TICKET_CHANNELS_IN_A_CATEGORY = 50

module.exports = {
  DELETE_TICKET_CONFIRMATION_COMPONENT,
  MAX_TICKET_CHANNELS_IN_A_CATEGORY,
  TICKET_CONTROLS_COMPONENTS,
  MODAL_TICKET,
  TICKET_CONTROLS_EMBED
}
