const {
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder
} = require('discord.js')

const TITLE_FILED = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setCustomId('title-sourcebin')
    .setLabel('Title')
    .setPlaceholder('Place here your content title')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
)

const DESCRIPTION_FIELD = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setCustomId('description-sourcebin')
    .setLabel('Description')
    .setPlaceholder('Place here your description')
    .setStyle(TextInputStyle.Short)
    .setRequired(false)
)

const CONTENT_FIELD = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setMinLength(1)
    .setCustomId('content-sourcebin')
    .setLabel('Content')
    .setPlaceholder('Place here your text')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)
)

const MODAL = new ModalBuilder()
  .setCustomId('sourcebin')
  .setTitle('Create a source bin')
  .addComponents(TITLE_FILED, DESCRIPTION_FIELD, CONTENT_FIELD)

module.exports = {
  MODAL,
  CONTENT_FIELD,
  DESCRIPTION_FIELD,
  TITLE_FILED
}
