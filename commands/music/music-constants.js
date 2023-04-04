const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

const DEFAULT_MUSIC_CHANNEL_NAME = '🎶 Music'
const rateLimitPerUser = 5 // <-- Seconds

const btnsControls = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('pause')
    .setLabel('⏯️')
    .setDisabled(false)
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('⏩')
    .setDisabled(false)
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId('stop')
    .setLabel('⏹️')
    .setDisabled(false)
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId('loop')
    .setDisabled(false)
    .setLabel('🔄️')
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId('shuffle')
    .setLabel('🔀')
    .setDisabled(false)
    .setStyle(ButtonStyle.Secondary)
)

module.exports = {
  btnsControls,
  rateLimitPerUser,
  DEFAULT_MUSIC_CHANNEL_NAME
}
